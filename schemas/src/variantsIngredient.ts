import { z } from "zod";
import { ingredient } from "./ingredient";
import { variant } from "./variant";

// this holds the values we need to find the object
const variantsIngredientId = z.object({
})
  .merge(variant.id)
  .merge(ingredient.id)

// this holds all the values that are not Ids, they don't point to anything
const variantsIngredientBase = z.object({

})

// here we add the ids, things this references
const variantsIngredientBaseWithIds = variantsIngredientBase
  .merge(variant.id)
  .merge(ingredient.id)

// this holds everything we need to create a new object
const variantsIngredientNew = z.object({
  // add anything here that can only be set once
})
  .merge(variantsIngredientBaseWithIds) // merge in the base schema

// this holds any values that we don't need / want when creating a new one
// but want to be updatable
const variantsIngredientUpdate = z.object({
  // anything that isn't passed through during creation but can be updated needs to be added here
})
  .merge(variantsIngredientBaseWithIds) // merge in new so those values are updatable
  .partial() // we want them partial because they may only want to update one or a couple of the values

// merge in everything
// this needs to be done in a specific order so the types are correct
const variantsIngredientItem = z.object({
  // here we define "custom" items, they are pulled in through relations
  // we can have the id of the thing if we want, but its not required.
})
  .merge(variantsIngredientId)
  .merge(variantsIngredientBase)
  // .merge() // for any references where we just want the id, not a value from it, merge it in

// when fetching a list of the object we need a way to verify it
// so here we just want an array of it  
const variantsIngredientList = z.array(variantsIngredientItem)

// export it out to be consumed
export const variantsIngredient = {
  id: variantsIngredientId,
  new: variantsIngredientNew,
  update: variantsIngredientUpdate,
  item: variantsIngredientItem,
  list: variantsIngredientList
}

type VariantsIngredientSchemas = typeof variantsIngredient
// export out the types to be consumed
export type VariantsIngredientId = z.infer<VariantsIngredientSchemas["id"]>
export type VariantsIngredientNew = z.infer<VariantsIngredientSchemas["new"]>
export type VariantsIngredientUpdate = z.infer<VariantsIngredientSchemas["update"]>
export type VariantsIngredientItem = z.infer<VariantsIngredientSchemas["item"]>
export type VariantsIngredientList = z.infer<VariantsIngredientSchemas["list"]>