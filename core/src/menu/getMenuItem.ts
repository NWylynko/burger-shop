import type { BurgerId, BurgerItem } from "@burger-shop/schemas/src/burger"

interface Functions {
  getBurger: (id: BurgerId) => Promise<BurgerItem>
}

export const getMenuItem = (functions: Functions) => async (burgerId: string) => {

  const burger = await functions.getBurger({ burgerId })

  return {
    burger
  }
}