import { z } from "zod";

// this holds the values we need to find the object
const ingredientId = z.object({
  ingredientId: z.string(),
})

// this holds all the values that are not Ids, they don't point to anything
const ingredientBase = z.object({
  name: z.string()
})

// here we add the ids, things this references
const ingredientBaseWithIds = ingredientBase
  // .merge()  // we merge in any ids we need

// this holds everything we need to create a new object
const ingredientNew = z.object({
  // add anything here that can only be set once
})
  .merge(ingredientBaseWithIds) // merge in the base schema

// this holds any values that we don't need / want when creating a new one
// but want to be updatable
const ingredientUpdate = z.object({
  // anything that isn't passed through during creation but can be updated needs to be added here
})
  .merge(ingredientBaseWithIds) // merge in new so those values are updatable
  .partial() // we want them partial because they may only want to update one or a couple of the values

// merge in everything
// this needs to be done in a specific order so the types are correct
const ingredientItem = z.object({
  // here we define "custom" items, they are pulled in through relations
  // we can have the id of the thing if we want, but its not required.
})
  .merge(ingredientId)
  .merge(ingredientBase)
  // .merge() // for any references where we just want the id, not a value from it, merge it in

// when fetching a list of the object we need a way to verify it
// so here we just want an array of it  
const ingredientList = z.array(ingredientItem)

// export it out to be consumed
export const ingredient = {
  id: ingredientId,
  new: ingredientNew,
  update: ingredientUpdate,
  item: ingredientItem,
  list: ingredientList
}

type IngredientSchemas = typeof ingredient
// export out the types to be consumed
export type IngredientId = z.infer<IngredientSchemas["id"]>
export type IngredientNew = z.infer<IngredientSchemas["new"]>
export type IngredientUpdate = z.infer<IngredientSchemas["update"]>
export type IngredientItem = z.infer<IngredientSchemas["item"]>
export type IngredientList = z.infer<IngredientSchemas["list"]>