import SQL from 'sql-template-tag';
import { emptyObject as schemas } from "@burger-shop/schemas/src/emptyObject";
import { randomUUID } from 'crypto';
import type { CRLUD } from "../CRLUD";
import type { DB } from "../database";

// replace 'emptyTableName' with the corresponding table name
// replace 'emptyObject' with the name of it
// replace 'emptyObjects' with the plural name of it
// replace 'emptyObjectId' with the id
// replace 'emptyNewObject' with 'new' + name
// replace 'emptyUpdateObject' with 'update' + name
// replace 'emptyOldObject' with 'old' + name
// replace 'emptyMergedObject' with 'merged' + name

export const emptyObject = (db: DB): CRLUD<typeof schemas> => ({
  create: async function (emptyNewObject) {
    const emptyObjectId = randomUUID();
    const result = await db.run(SQL`
      INSERT INTO emptyTableName (
        emptyObjectId,
      ) VALUES (
        ${emptyObjectId},
      )
    `);
    return {
      emptyObjectId,
    };
  },
  read: async function ({ emptyObjectId }) {
    const result = await db.get(SQL`
      SELECT
        // 
      FROM emptyTableName
      WHERE
        emptyTableName.emptyObjectId = ${emptyObjectId}
    `);

    if (!result) {
      throw new Error(`404 emptyObject not found`);
    }

    const emptyObject = await schemas.item.parseAsync(result);

    return emptyObject;

  },
  list: async function ({ cursor, limit }) {
    const result = await db.all(SQL`
      SELECT
        // 
      FROM emptyTableName
      WHERE emptyTableName.emptyObjectId > ${cursor}
      ORDER BY emptyTableName.emptyObjectId
      LIMIT ${limit}
    `);

    const emptyObjects = await schemas.list.parseAsync(result);

    return emptyObjects;
  },
  update: async function ({ emptyObjectId }, emptyUpdateObject) {
    const emptyOldObject = await (async () => {

      const result = await db.get(SQL`
        SELECT
        // 
        FROM emptyTableName
        WHERE
          emptyTableName.emptyObjectId = ${emptyObjectId}
      `);

      if (!result) {
        throw new Error(`404 emptyObject not found`);
      }

      // while this isn't strictly true, its close enough for what we need
      const emptyObject = await schemas.update.parseAsync(result);

      return emptyObject;

    })();

    const emptyMergedObject = { ...emptyOldObject, ...emptyUpdateObject };

    const result = await db.run(SQL`
      UPDATE emptyTableName
      SET
      // 
      WHERE
        emptyTableName.emptyObjectId = ${emptyObjectId}
    `);

    const emptyNewObject = await this.read({ emptyObjectId });

    return emptyNewObject;
  }, 
  delete: async function ({ emptyObjectId }) {
    const result = await db.run(SQL`
      DELETE FROM emptyTableName
      WHERE
        emptyTableName.emptyObjectId = ${emptyObjectId}
    `);
    return {
      emptyObjectId,
    };
  },
})