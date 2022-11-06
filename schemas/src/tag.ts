import { z } from "zod";

// this holds the values we need to find the object
const tagId = z.object({
  tagId: z.string(),
})

// this holds all the values that are not Ids, they don't point to anything
const tagBase = z.object({
  name: z.string()
})

// here we add the ids, things this references
const tagBaseWithIds = tagBase
  // .merge()  // we merge in any ids we need

// this holds everything we need to create a new object
const tagNew = z.object({
  // add anything here that can only be set once
})
  .merge(tagBaseWithIds) // merge in the base schema

// this holds any values that we don't need / want when creating a new one
// but want to be updatable
const tagUpdate = z.object({
  // anything that isn't passed through during creation but can be updated needs to be added here
})
  .merge(tagBaseWithIds) // merge in new so those values are updatable
  .partial() // we want them partial because they may only want to update one or a couple of the values

// merge in everything
// this needs to be done in a specific order so the types are correct
const tagItem = z.object({
  // here we define "custom" items, they are pulled in through relations
  // we can have the id of the thing if we want, but its not required.
})
  .merge(tagId)
  .merge(tagBase)
  // .merge() // for any references where we just want the id, not a value from it, merge it in

// when fetching a list of the object we need a way to verify it
// so here we just want an array of it  
const tagList = z.array(tagItem)

// export it out to be consumed
export const tag = {
  id: tagId,
  new: tagNew,
  update: tagUpdate,
  item: tagItem,
  list: tagList
}

type TagSchemas = typeof tag
// export out the types to be consumed
export type TagId = z.infer<TagSchemas["id"]>
export type TagNew = z.infer<TagSchemas["new"]>
export type TagUpdate = z.infer<TagSchemas["update"]>
export type TagItem = z.infer<TagSchemas["item"]>
export type TagList = z.infer<TagSchemas["list"]>