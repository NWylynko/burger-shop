import { burgerShop } from "@burger-shop/fetch/src/index";
import Image from "next/image";
import Link from "next/link";
import styles from "./Categories.module.css"

export const Categories = async () => {

  const menu = await burgerShop.menu();

  return (
    <div className={styles.categories}>
      {menu.map((category) => <Category key={category.categoryId} {...category} />)}
    </div>
  );
};

type Category = Awaited<ReturnType<typeof burgerShop.menu>>[number];

const Category = (props: Category) => {
  return (
    <div className={styles.category}>
      <h2 className={styles.categoryName}>{props.name}</h2>
      <span className={styles.categoryDescription}>{props.description}</span>
      <Burgers burgers={props.burgers} />
    </div>
  );
};

type Burgers = Category["burgers"];
type BurgersProps = {
  burgers: Burgers;
};

const Burgers = ({ burgers }: BurgersProps) => {
  return (
    <>
      {burgers.map((burger) => <Burger key={burger.burgerId} {...burger} />)}
    </>
  );
};

type Burger = Burgers[number];

const Burger = (burger: Burger) => {
  return (
    <Link href={`/burger/${burger.burgerId}`}>
      <div className={styles.burger}>
        <Image src={burger.imageUrl} height={128 * 1.5} width={128 * 1.5} alt={`Image of {burger.name}`} />
        <div className={styles.horizontal}>
          <h3>{burger.name}</h3>
          <span>{Price(burger.price)}</span>
        </div>
        <span className={styles.burgerDescription}>{burger.description}</span>
      </div>
    </Link>
  );
};

// this takes a number like 15, 13.5, or 12.50
// and normalises it to be $15.00, $13.50, $12.50
const Price = (priceNumber: number): string => {
  const priceString = priceNumber.toString()
  const parts = priceString.split('.')
  if (parts.length === 1) { // doesn't contain a . in the middle
    return `$${priceString}.00`
  }
  const digits = 2 - parts[1].length
  const zero = '0'.repeat(digits)
  return `$${priceString}${zero}`
}