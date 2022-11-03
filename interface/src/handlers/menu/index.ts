import { Logic } from "@/coreLogic";
import { Router } from "@/router";
import { GetMenuHandler } from "./getMenu";


export const MenuRouter = (router: Router, logic: Logic) => {
  router.get("/menu/getMenu", GetMenuHandler({
    getMenu: logic.menu.getMenu
  }))
}