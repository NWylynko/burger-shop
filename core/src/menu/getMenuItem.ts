import { VariantList, VariantLookup } from '@burger-shop/schemas/src/variant';
import type { BurgerId, BurgerItem } from "@burger-shop/schemas/src/burger"
import { Pagination } from '@/types';

interface Functions {
  getBurger: (id: BurgerId) => Promise<BurgerItem>
  lookupVariants: (ids: Pick<VariantLookup, "burgerId">, page: Pagination) => Promise<VariantList>
}

export const getMenuItem = (functions: Functions) => async (burgerId: string) => {

  const burger = await functions.getBurger({ burgerId })
  const variants = await functions.lookupVariants({ burgerId }, { cursor: '', limit: 10 })

  return {
    ...burger,
    variants
  }
}