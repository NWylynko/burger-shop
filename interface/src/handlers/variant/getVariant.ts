import { Logic } from "@/coreLogic"
import { JsonResponse } from "@/JsonResponse"
import { HandleRequest } from "@/server"
import { variant } from "@burger-shop/schemas/src/variant"

interface Functions {
  getVariant: Logic["menu"]["getVariant"]
}

export const getVariantHandler = (functions: Functions): HandleRequest => async (req) => {

  const { variantId } = await variant.id.parseAsync(req.params)

  const result = await functions.getVariant(variantId)

  return JsonResponse(200, result)
}
