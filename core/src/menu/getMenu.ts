import { type BurgerItem } from "@burger-shop/schemas/src/burger"

interface Functions {
  listBurgers: (page: Pagination) => Promise<BurgerItem[]>
}

export const getMenu = (functions: Functions) => async () => {

  // here we just want all the burgers, there is never going to really be
  // that many so we don't need to be too concerned about a large limit
  const burgers = await functions.listBurgers({ cursor: '', limit: 500 })

  return { 
    burgers
  }
}