import SQL from 'sql-template-tag';
import { burger as schemas } from "@burger-shop/schemas/src/burger";
import { randomUUID } from 'crypto';
import type { CRLUD } from "../CRLUD";
import type { DB } from "../database";

export const burger: CRLUD<typeof schemas> = (db: DB) => ({
  create: async function (newBurger) {
    const burgerId = randomUUID();
    const result = await db.run(SQL`
      INSERT INTO Burgers (
        burgerId,
        categoryId,
        imageId,
        name,
        description,
        price,
      ) VALUES (
        ${burgerId},
        ${newBurger.categoryId},
        ${newBurger.imageId},
        ${newBurger.name},
        ${newBurger.description},
        ${newBurger.price}
      )
    `);
    return {
      burgerId,
    };
  },
  read: async function ({ burgerId }) {
    const result = await db.get(SQL`
      SELECT
        Burgers.burgerId,
        Burgers.name,
        Burgers.description,
        Burgers.price,
        Burgers.categoryId,
        Images.imageUrl
      FROM Burgers, Images
      WHERE
        Burgers.burgerId = ${burgerId}
    `);

    if (!result) {
      throw new Error(`404 burger not found`);
    }

    const burger = await schemas.item.parseAsync(result);

    return burger;

  },
  list: async function () {
    const result = await db.all(SQL`
      SELECT
        Burgers.burgerId,
        Burgers.name,
        Burgers.description,
        Burgers.price,
        Burgers.categoryId,
        Images.imageUrl
      FROM Burgers, Images
    `);

    const burgers = await schemas.list.parseAsync(result);

    return burgers;
  },
  update: async function ({ burgerId }, updateBurger) {
    const oldBurger = await (async () => {

      const result = await db.get(SQL`
        SELECT
          Burgers.name,
          Burgers.description,
          Burgers.price,
          Burgers.categoryId,
          Burgers.imageId
        FROM Burgers
        WHERE
          Burgers.burgerId = ${burgerId}
      `);

      if (!result) {
        throw new Error(`404 burger not found`);
      }

      // while this isn't strictly true, its close enough for what we need
      const burger = await schemas.update.parseAsync(result);

      return burger;

    })();

    const mergedBurger = { ...oldBurger, ...updateBurger };

    const result = await db.run(SQL`
      UPDATE Burgers
      SET
        Burgers.name = ${mergedBurger.name},
        Burgers.description = ${mergedBurger.description},
        Burgers.price = ${mergedBurger.price},
        Burgers.categoryId = ${mergedBurger.categoryId},
        Burgers.imageId = ${mergedBurger.imageId}
      WHERE
        Burgers.burgerId = ${burgerId}
    `);

    const newBurger = await this.read({ burgerId });

    return newBurger;
  }, 
  delete: async function ({ burgerId }) {
    const result = await db.run(SQL`
      DELETE FROM Burgers
      WHERE
        Burgers.burgerId = ${burgerId}
    `);
    return {
      burgerId,
    };
  },
})