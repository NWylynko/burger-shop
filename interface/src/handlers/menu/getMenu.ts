import { Logic } from "@/coreLogic"
import { JsonResponse } from "@/JsonResponse"
import { HandleRequest } from "@/server"

interface Functions {
  getMenu: Logic["menu"]["getMenu"]
}

export const GetMenuHandler = (functions: Functions): HandleRequest => async (req) => {

  const result = await functions.getMenu()

  return JsonResponse(200, result)
}
