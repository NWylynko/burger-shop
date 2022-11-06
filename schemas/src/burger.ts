import { z } from "zod";
import { category } from "./category";
import { image } from "./image";

// this holds the values we need to find the object
const burgerId = z.object({
  burgerId: z.string()
})

// this holds all the values that are not Ids, they don't point to anything
const burgerBase = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number()
})

// here we add the ids, things this references
const burgerBaseWithIds =
  burgerBase
  .merge(category.id) // we merge in any ids we need
  .merge(image.id)
 
// this holds everything we need to create a new object
const burgerNew = z.object({
  // add anything here that can only be set once
})
  .merge(burgerBaseWithIds) // merge in the base schema

// this holds any values that we don't need / want when creating a new one
// but want to be updatable
const burgerUpdate = z.object({
  // anything that isn't passed through during creation but can be updated needs to be added here
})
  .merge(burgerBaseWithIds) // merge in new so those values are updatable
  .partial() // we want them partial because they may only want to update one or a couple of the values

// merge in everything
// this needs to be done in a specific order so the types are correct
const burgerItem = z.object({
  // here we define "custom" items, they are pulled in through relations
  // we can have the id of the thing if we want, but its not required.
  imageUrl: z.string().url()
})
  .merge(burgerId)
  .merge(burgerBase)
  .merge(category.id) // for example I want the category Id but don't need the image Id

// when fetching a list of the object we need a way to verify it
// so here we just want an array of it  
const burgerList = z.array(burgerItem)

// export it out to be consumed
export const burger = {
  id: burgerId,
  new: burgerNew,
  update: burgerUpdate,
  item: burgerItem,
  list: burgerList
}

type BurgerSchemas = typeof burger
// export out the types to be consumed
export type BurgerId = z.infer<BurgerSchemas["id"]>
export type BurgerNew = z.infer<BurgerSchemas["new"]>
export type BurgerUpdate = z.infer<BurgerSchemas["update"]>
export type BurgerItem = z.infer<BurgerSchemas["item"]>
export type BurgerList = z.infer<BurgerSchemas["list"]>