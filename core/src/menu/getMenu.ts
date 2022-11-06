import { type BurgerItem } from "@burger-shop/schemas/src/burger"

interface Functions {
  listBurgers: () => Promise<BurgerItem[]>
}

export const getMenu = (functions: Functions) => async () => {
  const burgers = await functions.listBurgers()

  return {
    burgers
  }
}