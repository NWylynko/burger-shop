import { Database } from "bun:sqlite";

export const openDB = async () => new Database("../mydb.sqlite");

export type DB = Awaited<ReturnType<typeof openDB>>