import qs from 'fast-querystring';


type CustomRequest = Request & { URL: URL, params: ReturnType<typeof qs["parse"]> };

export type HandleRequest = (req: CustomRequest) => Promise<Response>

type Options = {
  handleRequest: HandleRequest
}

export const startServer = (options: Options) => Bun.serve({
  fetch(req: Request) {

    const url = new URL(req.url)
    // qs.parse doesn't parse out the initial '?' so if its there we need to slice it out 
    const params = qs.parse(url.search[0] === "?" ? url.search.slice(1, url.search.length) : url.search)

    const customRequest = Object.assign(req, { URL: url, params })
    
    return options.handleRequest(customRequest)
  },

  // baseURI: "http://localhost:3000",

  // this is called when fetch() throws or rejects
  // error(err: Error) {
  //   return new Response("uh oh! :(\n" + err.toString(), { status: 500 });
  // },

  // this boolean enables bun's default error handler
  development: process.env.NODE_ENV !== "production",
  // note: this isn't node, but for compatibility bun supports process.env + more stuff in process

  // SSL is enabled if these two are set
  // certFile: './cert.pem',
  // keyFile: './key.pem',

  port: 4000, // number or string
});