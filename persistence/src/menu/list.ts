import { DB } from "@/database"


export const listMenu = (db: DB) => async () => {
  return [
    {
      id: "hello"
    }
  ]
}