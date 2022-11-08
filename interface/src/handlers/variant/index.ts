import { Logic } from "@/coreLogic";
import { Router } from "@/router";
import { getVariantHandler } from "./getVariant";


export const VariantRouter = (router: Router, logic: Logic) => {
  router.get("/variant", getVariantHandler({
    getVariant: logic.menu.getVariant
  }))
}
