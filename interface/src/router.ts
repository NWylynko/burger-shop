import * as FindMyWay from "find-my-way";
import { JsonResponse } from "./JsonResponse";

export const router = FindMyWay<FindMyWay.HTTPVersion.V2>({
  defaultRoute: async () => JsonResponse(404, { error: "404 not found" })
});

export type Router = typeof router;
