import { Logic } from "@/coreLogic";
import { Router } from "@/router";
import { getBurgerHandler } from "./getBurger";


export const BurgerRouter = (router: Router, logic: Logic) => {
  router.get("/burger", getBurgerHandler({
    getMenuItem: logic.menu.getMenuItem
  }))
}
