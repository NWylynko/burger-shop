import type { Database } from '@burger-shop/persistence';
import { getMenu } from "@burger-shop/core/src/menu/getMenu"

export const coreLogic = async (db: Database) => {
  return {
    menu: {
      getMenu: getMenu({
        listBurgers: db.burger.list
      })
    }
  }
}

export type Logic = Awaited<ReturnType<typeof coreLogic>>