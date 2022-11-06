import { z } from "zod";

// replace 'lowerCaseName' with the object with lower case first character
// replace 'upperCaseName' with the object with upper case first character

// this holds the values we need to find the object
const lowerCaseNameId = z.object({
  lowerCaseNameId: z.string(),
})

// this holds all the values that are not Ids, they don't point to anything
const lowerCaseNameBase = z.object({
  
})

// here we add the ids, things this references
const lowerCaseNameBaseWithIds = lowerCaseNameBase
  // .merge()  // we merge in any ids we need

// this holds everything we need to create a new object
const lowerCaseNameNew = z.object({
  // add anything here that can only be set once
})
  .merge(lowerCaseNameBaseWithIds) // merge in the base schema

// this holds any values that we don't need / want when creating a new one
// but want to be updatable
const lowerCaseNameUpdate = z.object({
  // anything that isn't passed through during creation but can be updated needs to be added here
})
  .merge(lowerCaseNameBaseWithIds) // merge in new so those values are updatable
  .partial() // we want them partial because they may only want to update one or a couple of the values

// merge in everything
// this needs to be done in a specific order so the types are correct
const lowerCaseNameItem = z.object({
  // here we define "custom" items, they are pulled in through relations
  // we can have the id of the thing if we want, but its not required.
})
  .merge(lowerCaseNameId)
  .merge(lowerCaseNameBase)
  // .merge() // for any references where we just want the id, not a value from it, merge it in

// when fetching a list of the object we need a way to verify it
// so here we just want an array of it  
const lowerCaseNameList = z.array(lowerCaseNameItem)

// export it out to be consumed
export const lowerCaseName = {
  id: lowerCaseNameId,
  new: lowerCaseNameNew,
  update: lowerCaseNameUpdate,
  item: lowerCaseNameItem,
  list: lowerCaseNameList
}

type upperCaseNameSchemas = typeof lowerCaseName
// export out the types to be consumed
export type upperCaseNameId = z.infer<upperCaseNameSchemas["id"]>
export type upperCaseNameNew = z.infer<upperCaseNameSchemas["new"]>
export type upperCaseNameUpdate = z.infer<upperCaseNameSchemas["update"]>
export type upperCaseNameItem = z.infer<upperCaseNameSchemas["item"]>
export type upperCaseNameList = z.infer<upperCaseNameSchemas["list"]>