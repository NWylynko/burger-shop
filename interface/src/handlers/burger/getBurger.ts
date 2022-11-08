import { Logic } from "@/coreLogic"
import { JsonResponse } from "@/JsonResponse"
import { HandleRequest } from "@/server"
import { burger } from "@burger-shop/schemas/src/burger"

interface Functions {
  getMenuItem: Logic["menu"]["getMenuItem"]
}

export const getBurgerHandler = (functions: Functions): HandleRequest => async (req) => {

  const { burgerId } = await burger.id.parseAsync(req.params)

  const result = await functions.getMenuItem(burgerId)

  return JsonResponse(200, result)
}

export type GetBurgerItemResponse = ReturnType<Functions["getMenuItem"]>