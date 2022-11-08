import { database } from "@burger-shop/persistence"

import { startServer } from "./server"
import { handleRequest } from "./handleRequest"
import { router } from "./router";
import { coreLogic } from "./coreLogic";

import { MenuRouter } from "./handlers/menu";
import { BurgerRouter } from "./handlers/burger";
import { VariantRouter } from "./handlers/variant";

const db = await database()
const logic = await coreLogic(db)

// register our handlers
MenuRouter(router, logic);
BurgerRouter(router, logic)
VariantRouter(router, logic)

const server = startServer({
  handleRequest: handleRequest(router)
})

console.log(`server listening on port ${server.port}`)