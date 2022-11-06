import { z } from "zod";

// this holds the values we need to find the object
const categoryId = z.object({
  categoryId: z.string()
})

// this holds all the values that are not Ids, they don't point to anything
const categoryBase = z.object({
  name: z.string(),
  description: z.string(),
})

// here we add the ids, things this references
const categoryBaseWithIds = categoryBase
  // .merge()  // we merge in any ids we need

// this holds everything we need to create a new object
const categoryNew = z.object({
  // add anything here that can only be set once
})
  .merge(categoryBaseWithIds) // merge in the base schema

// this holds any values that we don't need / want when creating a new one
// but want to be updatable
const categoryUpdate = z.object({
  // anything that isn't passed through during creation but can be updated needs to be added here
})
  .merge(categoryBaseWithIds) // merge in new so those values are updatable
  .partial() // we want them partial because they may only want to update one or a couple of the values

// merge in everything
// this needs to be done in a specific order so the types are correct
const categoryItem = z.object({
  // here we define "custom" items, they are pulled in through relations
  // we can have the id of the thing if we want, but its not required.
})
  .merge(categoryId)
  .merge(categoryBase)
  // .merge() // for any references where we just want the id, not a value from it, merge it in

// when fetching a list of the object we need a way to verify it
// so here we just want an array of it  
const categoryList = z.array(categoryItem)

// export it out to be consumed
export const category = {
  id: categoryId,
  new: categoryNew,
  update: categoryUpdate,
  item: categoryItem,
  list: categoryList
}

type CategorySchemas = typeof category
// export out the types to be consumed
export type CategoryId = z.infer<CategorySchemas["id"]>
export type CategoryNew = z.infer<CategorySchemas["new"]>
export type CategoryUpdate = z.infer<CategorySchemas["update"]>
export type CategoryItem = z.infer<CategorySchemas["item"]>
export type CategoryList = z.infer<CategorySchemas["list"]>