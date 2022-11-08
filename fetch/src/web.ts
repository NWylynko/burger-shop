import { z } from "zod";

export const web = {
  get: <Schema extends z.ZodType>(schema: Schema) => async (url: string): Promise<z.infer<Schema>> => {
    const response = await fetch(url);
    const result = await response.json() as unknown;
    const data = await schema.parseAsync(result);
    return data;
  }
};
