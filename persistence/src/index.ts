import { openDB } from "./database"

import { listMenu } from './menu/list';


export const database = async () => {
  
  const db = await openDB()

  return {
    menu: {
      listMenu: listMenu(db)
    }
  }
}

export type Database = Awaited<ReturnType<typeof database>>