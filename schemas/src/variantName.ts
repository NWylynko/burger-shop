import { z } from "zod";

// this holds the values we need to find the object
const variantNameId = z.object({
  variantNameId: z.string(),
})

// this holds all the values that are not Ids, they don't point to anything
const variantNameBase = z.object({
  name: z.string()
})

// here we add the ids, things this references
const variantNameBaseWithIds = variantNameBase
  // .merge()  // we merge in any ids we need

// this holds everything we need to create a new object
const variantNameNew = z.object({
  // add anything here that can only be set once
})
  .merge(variantNameBaseWithIds) // merge in the base schema

// this holds any values that we don't need / want when creating a new one
// but want to be updatable
const variantNameUpdate = z.object({
  // anything that isn't passed through during creation but can be updated needs to be added here
})
  .merge(variantNameBaseWithIds) // merge in new so those values are updatable
  .partial() // we want them partial because they may only want to update one or a couple of the values

// merge in everything
// this needs to be done in a specific order so the types are correct
const variantNameItem = z.object({
  // here we define "custom" items, they are pulled in through relations
  // we can have the id of the thing if we want, but its not required.
})
  .merge(variantNameId)
  .merge(variantNameBase)
  // .merge() // for any references where we just want the id, not a value from it, merge it in

// when fetching a list of the object we need a way to verify it
// so here we just want an array of it  
const variantNameList = z.array(variantNameItem)

// export it out to be consumed
export const variantName = {
  id: variantNameId,
  new: variantNameNew,
  update: variantNameUpdate,
  item: variantNameItem,
  list: variantNameList
}

type VariantNameSchemas = typeof variantName
// export out the types to be consumed
export type VariantNameId = z.infer<VariantNameSchemas["id"]>
export type VariantNameNew = z.infer<VariantNameSchemas["new"]>
export type VariantNameUpdate = z.infer<VariantNameSchemas["update"]>
export type VariantNameItem = z.infer<VariantNameSchemas["item"]>
export type VariantNameList = z.infer<VariantNameSchemas["list"]>