import { burgerShop } from "@burger-shop/fetch/src/index"

export default async function HomePage() {
  
  const menu = await burgerShop.menu()

  const burgerId = menu[0].burgers[0].burgerId
  const burger = await burgerShop.burger({ burgerId })

  const variantId = burger.variants[0].variantId
  const variant = await burgerShop.variant({ variantId })
  
  return (
    <span>
      <pre>{JSON.stringify(menu, null, 2)}</pre>
      <pre>{JSON.stringify(burger, null, 2)}</pre>
      <pre>{JSON.stringify(variant, null, 2)}</pre>
    </span>
  )
}