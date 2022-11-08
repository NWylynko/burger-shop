import type { Database } from '@burger-shop/persistence';

import { getMenu } from "@burger-shop/core/src/menu/getMenu"
import { getMenuItem } from '@burger-shop/core/src/menu/getMenuItem';
import { getVariant } from '@burger-shop/core/src/menu/getVariant';

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
      }),
      getVariant: getVariant({
        getVariant: db.variant.read,
        lookupTags: db.tag.lookup,
        lookupIngredients: db.ingredient.lookup
      })
    }
  }
}

export type Logic = Awaited<ReturnType<typeof coreLogic>>