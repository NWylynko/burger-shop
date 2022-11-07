import { z } from "zod";
import { tag } from "./tag";
import { variant } from "./variant";

// this holds the values we need to find the object
const variantsTagId = z.object({
})
  .merge(variant.id)
  .merge(tag.id)

// this holds all the values that are not Ids, they don't point to anything
const variantsTagBase = z.object({

})

// here we add the ids, things this references
const variantsTagBaseWithIds = variantsTagBase
  .merge(variant.id)
  .merge(tag.id)

// this holds everything we need to create a new object
const variantsTagNew = z.object({
  // add anything here that can only be set once
})
  .merge(variantsTagBaseWithIds) // merge in the base schema

// this holds any values that we don't need / want when creating a new one
// but want to be updatable
const variantsTagUpdate = z.object({
  // anything that isn't passed through during creation but can be updated needs to be added here
})
  .merge(variantsTagBaseWithIds) // merge in new so those values are updatable
  .partial() // we want them partial because they may only want to update one or a couple of the values

// merge in everything
// this needs to be done in a specific order so the types are correct
const variantsTagItem = z.object({
  // here we define "custom" items, they are pulled in through relations
  // we can have the id of the thing if we want, but its not required.
})
  .merge(variantsTagId)
  .merge(variantsTagBase)
// .merge() // for any references where we just want the id, not a value from it, merge it in

// when fetching a list of the object we need a way to verify it
// so here we just want an array of it  
const variantsTagList = z.array(variantsTagItem)

// export it out to be consumed
export const variantsTag = {
  id: variantsTagId,
  new: variantsTagNew,
  update: variantsTagUpdate,
  item: variantsTagItem,
  list: variantsTagList
}

type VariantsTagSchemas = typeof variantsTag
// export out the types to be consumed
export type VariantsTagId = z.infer<VariantsTagSchemas["id"]>
export type VariantsTagNew = z.infer<VariantsTagSchemas["new"]>
export type VariantsTagUpdate = z.infer<VariantsTagSchemas["update"]>
export type VariantsTagItem = z.infer<VariantsTagSchemas["item"]>
export type VariantsTagList = z.infer<VariantsTagSchemas["list"]>