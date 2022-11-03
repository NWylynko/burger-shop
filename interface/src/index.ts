import { database } from "@burger-shop/persistence"

import { startServer } from "./server"
import { handleRequest } from "./handleRequest"
import { MenuRouter } from "./handlers/menu";
import { router } from "./router";
import { coreLogic } from "./coreLogic";

const db = await database()
const logic = await coreLogic(db)

// register our handlers
MenuRouter(router, logic);

const server = startServer({
  handleRequest: handleRequest(router)
})

console.log(`server listening on port ${server.port}`)