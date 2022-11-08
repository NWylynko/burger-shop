import SQL from 'sql-template-tag';
import { variantsTag as schemas } from "@burger-shop/schemas/src/variantsTag";
import type { CRLUD } from "../CRLUD";
import type { DB } from "../database";

export const variantsTag = (db: DB): CRLUD<typeof schemas> => ({
  create: async function (newVariantsTag) {
    const result = await db.run(SQL`
      INSERT INTO VariantsTags (
        variantId,
        tagId
      ) VALUES (
        ${newVariantsTag.variantId},
        ${newVariantsTag.tagId}
      )
    `);
    return newVariantsTag;
  },
  read: async function ({ variantId, tagId }) {
    const result = await db.get(SQL`
      SELECT
        variantId,
        tagId
      FROM VariantsTags
      WHERE
        VariantsTags.variantId = ${variantId}
      AND
        VariantsTags.tagId = ${tagId}
    `);

    if (!result) {
      throw new Error(`404 variantsTag not found`);
    }

    const variantsTag = await schemas.item.parseAsync(result);

    return variantsTag;

  },
  list: async function ({ cursor, limit }) {
    const result = await db.all(SQL`
      SELECT
        variantId,
        tagId
      FROM VariantsTags
      WHERE VariantsTags.variantId > ${cursor}
      ORDER BY VariantsTags.variantId
      LIMIT ${limit}
    `);

    const variantsTags = await schemas.list.parseAsync(result);

    return variantsTags;
  },
  update: async function ({ variantId, tagId }, updateVariantsTag) {
    const oldVariantsTag = await (async () => {

      const result = await db.get(SQL`
        SELECT
          variantId,
          tagId
        FROM VariantsTags
        WHERE
          VariantsTags.variantId = ${variantId}
      `);

      if (!result) {
        throw new Error(`404 variantsTag not found`);
      }

      // while this isn't strictly true, its close enough for what we need
      const variantsTag = await schemas.update.parseAsync(result);

      return variantsTag;

    })();

    const mergedVariantsTag = { ...oldVariantsTag, ...updateVariantsTag };

    const result = await db.run(SQL`
      UPDATE VariantsTags
      SET
        variantId = ${mergedVariantsTag.variantId},
        tagId = ${mergedVariantsTag.tagId}
      WHERE
        VariantsTags.variantId = ${variantId}
    `);

    const newVariantsTag = await this.read({ variantId, tagId });

    return newVariantsTag;
  }, 
  delete: async function ({ variantId, tagId }) {
    const result = await db.run(SQL`
      DELETE FROM VariantsTags
      WHERE
        VariantsTags.variantId = ${variantId}
      AND
        VariantsTags.tagId = ${tagId}
    `);
    return {
      variantId,
      tagId
    };
  },
})