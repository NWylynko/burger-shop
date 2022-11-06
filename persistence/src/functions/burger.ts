import { DB } from "../database"
import { burger as schemas } from "@burger-shop/schemas/src/burger"
import type { BurgerId, BurgerItem, BurgerList, BurgerNew, BurgerUpdate } from "@burger-shop/schemas/src/burger"

export const burger = (db: DB) => {

  const createBurger = async (newBurger: BurgerNew): Promise<BurgerId> => {}

  const readBurger = async ({ burgerId }: BurgerId): Promise<BurgerItem> => {}
  
  const listBurger = async (): Promise<BurgerList> => {}
  
  const updateBurger = async (updateBurger: BurgerUpdate): Promise<BurgerId> => {}
  
  const deleteBurger = async ({ burgerId }: BurgerId): Promise<BurgerId> => {}

  return {
    create: createBurger,
    read: readBurger,
    list: listBurger,
    update: updateBurger,
    delete: deleteBurger,
  }
}
