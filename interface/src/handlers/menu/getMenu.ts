import { Logic } from "@/coreLogic"
import { JsonResponse } from "@/JsonResponse"

interface Functions {
  getMenu: Logic["menu"]["getMenu"]
}

export const GetMenuHandler = (functions: Functions) => async (req: Request): Promise<Response> => {

  const result = await functions.getMenu()

  return JsonResponse(200, result)
}