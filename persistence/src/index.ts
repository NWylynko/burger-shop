import { openDB } from "./database"

import { burger } from "./functions/burger";
import { category } from "./functions/category";
import { image } from "./functions/image";
import { ingredient } from "./functions/ingredient";
import { tag } from "./functions/tag";
import { variant } from "./functions/variant";
import { variantName } from "./functions/variantName";
import { variantsIngredient } from "./functions/variantsIngredient";
import { variantsTag } from "./functions/variantsTags";

export const database = async () => {
  
  const db = await openDB()

  return {
    burger: burger(db),
    category: category(db),
    image: image(db),
    ingredient: ingredient(db),
    tag: tag(db),
    variant: variant(db),
    variantName: variantName(db),
    variantsTag: variantsTag(db),
    variantsIngredient: variantsIngredient(db),
  }
}

export type Database = Awaited<ReturnType<typeof database>>