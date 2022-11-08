import { variant, VariantId, VariantItem } from '@burger-shop/schemas/src/variant';
import { VariantsIngredientId } from '@burger-shop/schemas/src/variantsIngredient';
import { VariantsTagId } from '@burger-shop/schemas/src/variantsTag';
import { IngredientList } from '@burger-shop/schemas/src/ingredient';
import { TagList } from '@burger-shop/schemas/src/tag';
import { Pagination } from "../types"
import { z } from "zod"

interface Functions {
  getVariant: (ids: VariantId) => Promise<VariantItem>
  lookupTags: (ids: Pick<VariantsTagId, "variantId">, page: Pagination) => Promise<TagList>
  lookupIngredients: (ids: Pick<VariantsIngredientId, "variantId">, page: Pagination) => Promise<IngredientList>
}

export const getVariant = (functions: Functions) => async (variantId: string) => {

  const variant = await functions.getVariant({ variantId });

  const allTags = await functions.lookupTags({ variantId }, { cursor: '', limit: 500 });
  const allIngredients = await functions.lookupIngredients({ variantId }, { cursor: '', limit: 500 });

  const tags = allTags.map(({ name }) => name)
  const ingredients = allIngredients.map(({ name }) => name)

  return getVariantSchema.parseAsync({
    ...variant,
    tags,
    ingredients
  })
}

export const getVariantSchema = variant.item.merge(
  z.object({
    tags: z.array(z.string()),
    ingredients: z.array(z.string()),
  })
)