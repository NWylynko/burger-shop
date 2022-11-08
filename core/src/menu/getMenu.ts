import { Pagination } from "../types"
import { z } from "zod"
import { burger, BurgerList } from "@burger-shop/schemas/src/burger"
import { category, CategoryList } from "@burger-shop/schemas/src/category"

interface Functions {
  listBurgers: (page: Pagination) => Promise<BurgerList>
  listCategories: (page: Pagination) => Promise<CategoryList>
}

export const getMenu = (functions: Functions) => async () => {

  // here we just want all the burgers, there is never going to really be
  // that many so we don't need to be too concerned about a large limit
  const allBurgers = await functions.listBurgers({ cursor: '', limit: 500 })
  const allCategories = await functions.listCategories({ cursor: '', limit: 500 })

  const menu = allCategories.map(category => {
    const burgers = allBurgers.filter(burger => {
      return burger.categoryId === category.categoryId
    })
    return {
      ...category,
      burgers
    }
  })

  return getMenuSchema.parseAsync(menu)
}

export const getMenuSchema = z.array(
  category.item.merge(
    z.object({
      burgers: burger.list
    })
  )
)
