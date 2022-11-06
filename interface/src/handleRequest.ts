import type { HandleRequest } from "./server";
import { Router } from "./router";
import { JsonResponse } from "./JsonResponse";
import { fromZodError } from "zod-validation-error"

export const handleRequest = (router: Router): HandleRequest => async (req) => {

  const url = new URL(req.url)

  console.log(`new request for ${url.pathname}`)

  try {
    
    // we are using find my way a little different
    // bun works in a Request -> Response fashion
    // but node http typically works in (Request, Response) -> void
    // way, essentially the response object contains functions
    // as callbacks to return a response. This is an outdated model
    // but its the one FindMyWay works. Luckily we can trick it
    // just a little and it will work as we like
    // @ts-ignore
    const response = await router.lookup(req) as Response

    return response

  } catch (error: any) {

    if ('issues' in error) {

      const validationError = fromZodError(error)

      return JsonResponse(400, {
        error: validationError.message,
        zodError: validationError.details
      })

    }

    return JsonResponse(500, { error: error.message })
    
  }


};