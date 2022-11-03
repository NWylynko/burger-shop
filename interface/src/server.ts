
export type HandleRequest = (req: Request) => Promise<Response>

type Options = {
  handleRequest: HandleRequest
}

export const startServer = (options: Options) => Bun.serve({
  fetch(req: Request) {
    return options.handleRequest(req)
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

  port: 3000, // number or string
});