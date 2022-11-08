import { z } from "zod";

export const web = {
  get: <Schema extends z.ZodType>(schema: Schema) => async (url: string): Promise<z.infer<Schema>> => {
    const response = await fetch(`http://localhost:4000${url}`);
    const result = await response.json() as unknown;
    console.log({ result })
    const data = await schema.parseAsync(result);
    return data;
  }
};
