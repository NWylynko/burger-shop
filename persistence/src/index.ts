import { openDB } from "./database"

import { listBurgers } from './burger/list';


export const database = async () => {
  
  const db = await openDB()

  return {
    burger: {
      list: listBurgers(db)
    }
  }
}

export type Database = Awaited<ReturnType<typeof database>>