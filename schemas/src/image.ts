import { z } from "zod";

// this holds the values we need to find the object
const imageId = z.object({
  imageId: z.string(),
})

// this holds all the values that are not Ids, they don't point to anything
const imageBase = z.object({
  url: z.string()
})

// here we add the ids, things this references
const imageBaseWithIds = imageBase
  // .merge()  // we merge in any ids we need

// this holds everything we need to create a new object
const imageNew = z.object({
  // add anything here that can only be set once
})
  .merge(imageBaseWithIds) // merge in the base schema

// this holds any values that we don't need / want when creating a new one
// but want to be updatable
const imageUpdate = z.object({
  // anything that isn't passed through during creation but can be updated needs to be added here
})
  .merge(imageBaseWithIds) // merge in new so those values are updatable
  .partial() // we want them partial because they may only want to update one or a couple of the values

// merge in everything
// this needs to be done in a specific order so the types are correct
const imageItem = z.object({
  // here we define "custom" items, they are pulled in through relations
  // we can have the id of the thing if we want, but its not required.
})
  .merge(imageId)
  .merge(imageBase)
  // .merge() // for any references where we just want the id, not a value from it, merge it in

// when fetching a list of the object we need a way to verify it
// so here we just want an array of it  
const imageList = z.array(imageItem)

// export it out to be consumed
export const image = {
  id: imageId,
  new: imageNew,
  update: imageUpdate,
  item: imageItem,
  list: imageList
}

type ImageSchemas = typeof image
// export out the types to be consumed
export type ImageId = z.infer<ImageSchemas["id"]>
export type ImageNew = z.infer<ImageSchemas["new"]>
export type ImageUpdate = z.infer<ImageSchemas["update"]>
export type ImageItem = z.infer<ImageSchemas["item"]>
export type ImageList = z.infer<ImageSchemas["list"]>