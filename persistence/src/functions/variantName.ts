import SQL from 'sql-template-tag';
import { variantName as schemas } from "@burger-shop/schemas/src/variantName";
import { randomUUID } from 'crypto';
import type { CRLUD } from "../CRLUD";
import type { DB } from "../database";

export const variantName = (db: DB): CRLUD<typeof schemas> => ({
  create: async function (newVariant) {
    const variantNameId = randomUUID();
    const result = await db.run(SQL`
      INSERT INTO VariantNames (
        variantNameId,
        name
      ) VALUES (
        ${variantNameId},
        ${newVariant.name}
      )
    `);
    return {
      variantNameId,
    };
  },
  read: async function ({ variantNameId }) {
    const result = await db.get(SQL`
      SELECT
        variantNameId,
        name
      FROM VariantNames
      WHERE
        variantNameId = ${variantNameId}
    `);

    if (!result) {
      throw new Error(`404 variantName not found`);
    }

    const variantName = await schemas.item.parseAsync(result);

    return variantName;

  },
  list: async function ({ cursor, limit }) {
    const result = await db.all(SQL`
      SELECT
        variantNameId,
        name
      FROM VariantNames
      WHERE variantNameId > ${cursor}
      ORDER BY variantNameId
      LIMIT ${limit}
    `);

    const variantNames = await schemas.list.parseAsync(result);

    return variantNames;
  },
  update: async function ({ variantNameId }, updateVariant) {
    const oldVariant = await (async () => {

      const result = await db.get(SQL`
        SELECT
          name
        FROM VariantNames
        WHERE
          variantNameId = ${variantNameId}
      `);

      if (!result) {
        throw new Error(`404 variantName not found`);
      }

      // while this isn't strictly true, its close enough for what we need
      const variantName = await schemas.update.parseAsync(result);

      return variantName;

    })();

    const mergedVariant = { ...oldVariant, ...updateVariant };

    const result = await db.run(SQL`
      UPDATE VariantNames
      SET
        name = ${mergedVariant.name},
      WHERE
        variantNameId = ${variantNameId}
    `);

    const newVariant = await this.read({ variantNameId });

    return newVariant;
  }, 
  delete: async function ({ variantNameId }) {
    const result = await db.run(SQL`
      DELETE FROM VariantNames
      WHERE
        variantNameId = ${variantNameId}
    `);
    return {
      variantNameId,
    };
  },
})