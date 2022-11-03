import type { HandleRequest } from "./server";
import { Router } from "./router";

export const handleRequest = (router: Router): HandleRequest => async (req) => {

  const url = new URL(req.url)

  console.log(`new request for ${url.pathname}`)

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
};