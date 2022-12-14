import { z } from "zod";

type CreateItem<NewSchema, IdSchema> = (newBurger: NewSchema) => Promise<IdSchema>;
type ReadItem<IdSchema, ItemSchema> = (ids: IdSchema) => Promise<ItemSchema>;
type Pagination = { cursor: string, limit: number }
type ListItems<ListSchema> = ({ cursor, limit }: Pagination) => Promise<ListSchema>;
type UpdateItem<IdSchema, UpdateSchema, ItemSchema> = (ids: IdSchema, updateBurger: UpdateSchema) => Promise<ItemSchema>;
type DeleteItem<IdSchema> = (ids: IdSchema) => Promise<IdSchema>;

// Create, Read, List, Update, Delete

export type CRLUD<
  Schemas extends BaseSchemas,
  IdSchema = z.infer<Schemas["id"]>,
  NewSchema = z.infer<Schemas["new"]>,
  ItemSchema = z.infer<Schemas["item"]>,
  ListSchema = z.infer<Schemas["list"]>,
  UpdateSchema = z.infer<Schemas["update"]>
  > = {
    create: CreateItem<NewSchema, IdSchema>;
    read: ReadItem<IdSchema, ItemSchema>;
    list: ListItems<ListSchema>;
    update: UpdateItem<IdSchema, UpdateSchema, ItemSchema>;
    delete: DeleteItem<IdSchema>;
  };

type BaseSchemas = {
  id: z.ZodObject<any, any, any>;
  new: z.ZodObject<any, any, any>;
  update: z.ZodObject<any, any, any>;
  item: z.ZodObject<any, any, any>;
  list: z.ZodArray<z.ZodObject<any, any, any>>;
};


// these are extra database functions that can be added and implemented if needed, not part of the base thou.
export type LookupItems<LookupSchema, ListSchema> = (lookup: LookupSchema, { cursor, limit }: Pagination) => Promise<ListSchema>