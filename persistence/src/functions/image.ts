import SQL from 'sql-template-tag';
import { image as schemas } from "@burger-shop/schemas/src/image";
import { randomUUID } from 'crypto';
import type { CRLUD } from "../CRLUD";
import type { DB } from "../database";

export const image: CRLUD<typeof schemas> = (db: DB) => ({
  create: async function (newImage) {
    const imageId = randomUUID();
    const result = await db.run(SQL`
      INSERT INTO Images (
        imageId,
        url
      ) VALUES (
        ${imageId},
        ${newImage.url}
      )
    `);
    return {
      imageId,
    };
  },
  read: async function ({ imageId }) {
    const result = await db.get(SQL`
      SELECT
        imageId,
        url
      FROM Images
      WHERE
        imageId = ${imageId}
    `);

    if (!result) {
      throw new Error(`404 image not found`);
    }

    const image = await schemas.item.parseAsync(result);

    return image;

  },
  list: async function ({ cursor, limit }) {
    const result = await db.all(SQL`
      SELECT
        imageId,
        url
      FROM Images
      WHERE imageId > ${cursor}
      ORDER BY imageId
      LIMIT ${limit}
    `);

    const images = await schemas.list.parseAsync(result);

    return images;
  },
  update: async function ({ imageId }, updateImage) {
    const oldImage = await (async () => {

      const result = await db.get(SQL`
        SELECT
          url
        FROM Images
        WHERE
          imageId = ${imageId}
      `);

      if (!result) {
        throw new Error(`404 image not found`);
      }

      // while this isn't strictly true, its close enough for what we need
      const image = await schemas.update.parseAsync(result);

      return image;

    })();

    const mergedImage = { ...oldImage, ...updateImage };

    const result = await db.run(SQL`
      UPDATE Images
      SET
        url = ${mergedImage.url},
      WHERE
        imageId = ${imageId}
    `);

    const newImage = await this.read({ imageId });

    return newImage;
  }, 
  delete: async function ({ imageId }) {
    const result = await db.run(SQL`
      DELETE FROM Images
      WHERE
        imageId = ${imageId}
    `);
    return {
      imageId,
    };
  },
})