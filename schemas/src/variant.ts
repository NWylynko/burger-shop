import { z } from "zod";
import { burger } from "./burger";
import { image } from "./image";
import { variantName } from "./variantName";

// this holds the values we need to find the object
const variantId = z.object({
  variantId: z.string(),
})

// this holds all the values that are not Ids, they don't point to anything
const variantBase = z.object({
  calories: z.number()
})

// here we add the ids, things this references 
const variantBaseWithIds = variantBase
  .merge(burger.id)  // we merge in any ids we need
  .merge(variantName.id)
  .merge(image.id)

// this holds everything we need to create a new object
const variantNew = z.object({
  // add anything here that can only be set once
})
  .merge(variantBaseWithIds) // merge in the base schema

// this holds any values that we don't need / want when creating a new one
// but want to be updatable
const variantUpdate = z.object({
  // anything that isn't passed through during creation but can be updated needs to be added here
})
  .merge(variantBaseWithIds) // merge in new so those values are updatable
  .partial() // we want them partial because they may only want to update one or a couple of the values

// merge in everything
// this needs to be done in a specific order so the types are correct
const variantItem = z.object({
  // here we define "custom" items, they are pulled in through relations
  // we can have the id of the thing if we want, but its not required.
})
  .merge(variantId)
  .merge(variantBase)
  // .merge() // for any references where we just want the id, not a value from it, merge it in

// when fetching a list of the object we need a way to verify it
// so here we just want an array of it  
const variantList = z.array(variantItem)

// export it out to be consumed
export const variant = {
  id: variantId,
  new: variantNew,
  update: variantUpdate,
  item: variantItem,
  list: variantList
}

type VariantSchemas = typeof variant
// export out the types to be consumed
export type VariantId = z.infer<VariantSchemas["id"]>
export type VariantNew = z.infer<VariantSchemas["new"]>
export type VariantUpdate = z.infer<VariantSchemas["update"]>
export type VariantItem = z.infer<VariantSchemas["item"]>
export type VariantList = z.infer<VariantSchemas["list"]>