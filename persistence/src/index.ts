import { openDB } from "./database"

import { burger } from "./functions/burger";


export const database = async () => {
  
  const db = await openDB()

  return {
    burger: burger(db)
  }
}

export type Database = Awaited<ReturnType<typeof database>>