import type { Database } from '@burger-shop/persistence';

import { getMenu } from "@burger-shop/core/src/menu/getMenu"
import { getMenuItem } from '@burger-shop/core/src/menu/getMenuItem';

export const coreLogic = async (db: Database) => {
  return {
    menu: {
      getMenu: getMenu({
        listBurgers: db.burger.list,
        listCategories: db.category.list
      }),
      getMenuItem: getMenuItem({
        getBurger: db.burger.read,
        lookupVariants: db.variant.lookup
      })
    }
  }
}

export type Logic = Awaited<ReturnType<typeof coreLogic>>