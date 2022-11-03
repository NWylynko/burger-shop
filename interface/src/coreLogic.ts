import type { Database } from '@burger-shop/persistence';
import { getMenu } from "@burger-shop/core/src/menu/getMenu"

export const coreLogic = async (db: Database) => {
  return {
    menu: {
      getMenu: getMenu({
        listMenu: db.menu.listMenu
      })
    }
  }
}

export type Logic = Awaited<ReturnType<typeof coreLogic>>