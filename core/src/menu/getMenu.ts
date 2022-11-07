import { type BurgerItem } from "@burger-shop/schemas/src/burger"

interface Functions {
  listBurgers: (page: Pagination) => Promise<BurgerItem[]>
}

export const getMenu = (functions: Functions) => async () => {
  const burgers = await functions.listBurgers({ cursor: '', limit: 5 })

  return { 
    burgers
  }
}