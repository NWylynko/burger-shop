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
        Images.url as imageUrl
      FROM Burgers, Images
      WHERE
        Burgers.burgerId = ${burgerId}
        AND Burgers.imageId = Images.imageId
    `);

    if (!result) {
      throw new Error(`404 burger not found`);
    }

    const burger = await schemas.item.parseAsync(result);

    return burger;

  },
  list: async function ({ cursor, limit }) {
    const result = await db.all(SQL`
      SELECT
        Burgers.burgerId,
        Burgers.name,
        Burgers.description,
        Burgers.price,
        Burgers.categoryId,
        Images.url as imageUrl
      FROM Burgers, Images
      WHERE Burgers.burgerId > ${cursor}
      AND Burgers.imageId = Images.imageId
      ORDER BY Burgers.burgerId
      LIMIT ${limit}
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

    // reading again is both a good and bad idea

    // its good as if a silent error occurs with the write above
    // then the user can see that it didn't seem to write correctly
    // and try again.

    // its a bad idea as the database might be distributed and
    // you hit a race condition with the write not propagated yet
    // so it may be smarter to just return the merged object instead
  
    // additionally another read will make this function slower
    // but its potentially safer to do another read as we don't potentially
    // send the user data that's not actually from the database, 
    // when the client is expecting that

    // another thing to note is depending on the caching in the client
    // they may just do a flush and re-fetch the read function on a mutation
    // meaning that returning the full object here is useless as they will
    // just fetch it again. This can be mitigated by running our own cache
    // and doing smarter caching on our side given the observability we have
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