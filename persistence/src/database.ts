import { Database } from "bun:sqlite";
import { type Sql } from "sql-template-tag";

const values = (arr: unknown[]) => {
  return arr.reduce<{ [key: string]: unknown }>((obj, value, index) => {
    obj[`$${index + 1}`] = value
    return obj
  }, {})
}

export const openDB = async () => {

  const database = new Database("../mydb.sqlite")

  const run = async (sql: Sql) => {
    
    const result = database.run(sql.text, ...sql.values)

    console.log({
      sql,
      result
    })

    return result;

  }

  const get = async (sql: Sql) => {

    const request = database.prepare(sql.text)

    const requestValues = values(sql.values)

    // @ts-ignore
    const result = request.get(requestValues)

    console.log({
      sql,
      request,
      requestValues,
      result
    })
  
    return result as unknown

  }

  const all = async (sql: Sql) => {

    const request = database.prepare(sql.text)

    const requestValues = values(sql.values)

    // @ts-ignore
    const result = request.all(requestValues)

    console.log({
      sql,
      request,
      requestValues,
      result
    })
  
    return result as unknown

  }

  return {
    run,
    get,
    all,
    sqlite: database
  }

};

export type DB = Awaited<ReturnType<typeof openDB>>
