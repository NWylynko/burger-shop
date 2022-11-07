import { ingredient as schemas } from "@burger-shop/schemas/src/ingredient";
import { randomUUID } from 'crypto';
import SQL from 'sql-template-tag';
import type { CRLUD } from "../CRLUD";
import type { DB } from "../database";

export const ingredient: CRLUD<typeof schemas> = (db: DB) => ({
  create: async function (newIngredient) {
    const ingredientId = randomUUID();
    const result = await db.run(SQL`
      INSERT INTO Ingredients (
        ingredientId,
        name
      ) VALUES (
        ${ingredientId},
        ${newIngredient.name}
      )
    `);
    return {
      ingredientId,
    };
  },
  read: async function ({ ingredientId }) {
    const result = await db.get(SQL`
      SELECT
        ingredientId,
        name
      FROM Ingredients
      WHERE
        ingredientId = ${ingredientId}
    `);

    if (!result) {
      throw new Error(`404 ingredient not found`);
    }

    const ingredient = await schemas.item.parseAsync(result);

    return ingredient;

  },
  list: async function ({ cursor, limit }) {
    const result = await db.all(SQL`
      SELECT
        ingredientId,
        name
      FROM Ingredients
      WHERE ingredientId > ${cursor}
      ORDER BY ingredientId
      LIMIT ${limit}
    `);

    const ingredients = await schemas.list.parseAsync(result);

    return ingredients;
  },
  update: async function ({ ingredientId }, updateIngredient) {
    const oldIngredient = await (async () => {

      const result = await db.get(SQL`
        SELECT
          name
        FROM Ingredients
        WHERE
          ingredientId = ${ingredientId}
      `);

      if (!result) {
        throw new Error(`404 ingredient not found`);
      }

      // while this isn't strictly true, its close enough for what we need
      const ingredient = await schemas.update.parseAsync(result);

      return ingredient;

    })();

    const mergedIngredient = { ...oldIngredient, ...updateIngredient };

    const result = await db.run(SQL`
      UPDATE Ingredients
      SET
        name = ${mergedIngredient.name},
      WHERE
        ingredientId = ${ingredientId}
    `);

    const newIngredient = await this.read({ ingredientId });

    return newIngredient;
  }, 
  delete: async function ({ ingredientId }) {
    const result = await db.run(SQL`
      DELETE FROM Ingredients
      WHERE
        ingredientId = ${ingredientId}
    `);
    return {
      ingredientId,
    };
  },
})