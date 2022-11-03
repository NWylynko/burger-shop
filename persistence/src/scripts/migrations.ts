
// this little script here reads in a directly for all the .sql files
// they need to be numbered, it then sorts then from smallest to largest
// it reads the database to find out the last migration applied
// and keeps going from that one onwards
// the migration files should be considered as write once, then read only
// messing with out migrations can cause problems

import { Database } from "bun:sqlite";
import { readdir } from "fs/promises"
import { join } from "path"
import SQL, { raw, type Sql } from "sql-template-tag"

const database = new Database("../mydb.sqlite");

const exec = (sql: Sql) => database.run(sql.text, ...sql.values)
const get = <Response, > (sql: Sql) => database.prepare(sql.text).get(values(sql.values)) as Response | undefined
const all = <Response extends [], > (sql: Sql) => database.prepare(sql.text).all(values(sql.values)) as Response

const values = (arr: unknown[]) => {
  return arr.reduce<{ [key: string]: unknown }>((obj, value, index) => {
    obj[`$${index + 1}`] = value
    return obj
  }, {})
}

interface Migration {
  id: string;
  state: "ADDED" | "ERRORED" | "SUCCESS"
}

exec(SQL`
  CREATE TABLE IF NOT EXISTS _migrations (
    id TEXT PRIMARY KEY,
    state TEXT
  )
`)

const migrationsFolderDir = join(process.cwd(), "migrations")
const migrationsAllPaths = await readdir(migrationsFolderDir)
const migrationsSQLPaths = migrationsAllPaths
  .filter(path => path.endsWith(".sql"))
  .sort((a, b) => Number(a.replace('.sql', '')) - Number(b.replace('.sql', '')))
  .map(path => ({ 
    fullPath: join(migrationsFolderDir, path),
    localPath: path,
    id: path.replace('.sql', '')
  }))

for await (const { id, fullPath } of migrationsSQLPaths) {

  const migration = get<Migration>(SQL`
    SELECT * FROM _migrations
    WHERE id = ${id}
  `)

  if (migration) {
    if (migration.state === "SUCCESS") {
      // skip, already done yay
      console.log(`migration ${id} is already complete`)
    } else if (migration.state === "ADDED" || migration.state === "ERRORED") {
      // attempt again
      await migrate(id, fullPath);
    }
  } else {
    // add the migration as state "ADDED"
    exec(SQL`
      INSERT INTO _migrations (id, state) VALUES (${id}, "ADDED")
    `)
    // now attempt
    await migrate(id, fullPath);
  }
}

database.close()

async function migrate(id: string, fullPath: string) {
  try {
    const sqlBlob = Bun.file(fullPath);
    const sqlString = await sqlBlob.text();
    const sql = raw(sqlString).text;
  
    database.run(sql);
  } catch (error) {
    // oh no it didnt work
    console.error(error)
    console.error(`migration ${id} failed to apply`)
    exec(SQL`
      UPDATE _migrations
      SET state = "ERRORED"
      WHERE id = ${id}
    `)
  }
  // yay it worked
  console.log(`migration ${id} successfully applied`)
  exec(SQL`
    UPDATE _migrations
    SET state = "SUCCESS"
    WHERE id = ${id}
  `)

}
