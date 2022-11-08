import { variant, VariantList, VariantLookup } from '@burger-shop/schemas/src/variant';
import { burger, BurgerId, BurgerItem } from "@burger-shop/schemas/src/burger"
import { Pagination } from '../types';
import { z } from "zod"

interface Functions {
  getBurger: (id: BurgerId) => Promise<BurgerItem>
  lookupVariants: (ids: Pick<VariantLookup, "burgerId">, page: Pagination) => Promise<VariantList>
}

export const getMenuItem = (functions: Functions) => async (burgerId: string) => {

  const burger = await functions.getBurger({ burgerId })
  const variants = await functions.lookupVariants({ burgerId }, { cursor: '', limit: 10 })

  return getMenuItemSchema.parseAsync({
    ...burger,
    variants
  })
}

export const getMenuItemSchema = burger.item.merge(
  z.object({
    variants: variant.list
  })
)