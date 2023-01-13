import { z } from "zod";

export const web = {
  get: <Schema extends z.ZodType>(schema: Schema) => async (url: string, config?: RequestInit | undefined): Promise<z.infer<Schema>> => {
    const response = await fetch(`http://127.0.0.1:4000${url}`, config);
    const result = await response.json() as unknown;
    console.log({ result })
    const data = await schema.parseAsync(result);
    return data;
  }
};
