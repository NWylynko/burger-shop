import { tag as schemas } from "@burger-shop/schemas/src/tag";
import { randomUUID } from 'crypto';
import SQL from 'sql-template-tag';
import type { CRLUD } from "../CRLUD";
import type { DB } from "../database";

export const tag = (db: DB): CRLUD<typeof schemas> => ({
  create: async function (newTag) {
    const tagId = randomUUID();
    const result = await db.run(SQL`
      INSERT INTO Tags (
        tagId,
        name
      ) VALUES (
        ${tagId},
        ${newTag.name}
      )
    `);
    return {
      tagId,
    };
  },
  read: async function ({ tagId }) {
    const result = await db.get(SQL`
      SELECT
        tagId,
        name
      FROM Tags
      WHERE
        tagId = ${tagId}
    `);

    if (!result) {
      throw new Error(`404 tag not found`);
    }

    const tag = await schemas.item.parseAsync(result);

    return tag;

  },
  list: async function ({ cursor, limit }) {
    const result = await db.all(SQL`
      SELECT
        tagId,
        name
      FROM Tags
      WHERE tagId > ${cursor}
      ORDER BY tagId
      LIMIT ${limit}
    `);

    const tags = await schemas.list.parseAsync(result);

    return tags;
  },
  update: async function ({ tagId }, updateTag) {
    const oldTag = await (async () => {

      const result = await db.get(SQL`
        SELECT
          name
        FROM Tags
        WHERE
          tagId = ${tagId}
      `);

      if (!result) {
        throw new Error(`404 tag not found`);
      }

      // while this isn't strictly true, its close enough for what we need
      const tag = await schemas.update.parseAsync(result);

      return tag;

    })();

    const mergedTag = { ...oldTag, ...updateTag };

    const result = await db.run(SQL`
      UPDATE Tags
      SET
        name = ${mergedTag.name},
      WHERE
        tagId = ${tagId}
    `);

    const newTag = await this.read({ tagId });

    return newTag;
  }, 
  delete: async function ({ tagId }) {
    const result = await db.run(SQL`
      DELETE FROM Tags
      WHERE
        tagId = ${tagId}
    `);
    return {
      tagId,
    };
  },
})