import SQL from 'sql-template-tag';
import { variantsIngredient as schemas } from "@burger-shop/schemas/src/variantsIngredient";
import type { CRLUD } from "../CRLUD";
import type { DB } from "../database";

export const variantsIngredient: CRLUD<typeof schemas> = (db: DB) => ({
  create: async function (newVariantsIngredient) {
    const result = await db.run(SQL`
      INSERT INTO VariantsIngredients (
        variantId,
        ingredientId
      ) VALUES (
        ${newVariantsIngredient.variantId},
        ${newVariantsIngredient.ingredientId}
      )
    `);
    return newVariantsIngredient
  },
  read: async function ({ variantId }) {
    const result = await db.get(SQL`
      SELECT
        variantId,
        ingredientId
      FROM VariantsIngredients
      WHERE
        VariantsIngredients.variantId = ${variantId}
    `);

    if (!result) {
      throw new Error(`404 variantsIngredient not found`);
    }

    const variantsIngredient = await schemas.item.parseAsync(result);

    return variantsIngredient;

  },
  list: async function ({ cursor, limit }) {
    const result = await db.all(SQL`
      SELECT
        variantId,
        ingredientId
      FROM VariantsIngredients
      WHERE VariantsIngredients.variantId > ${cursor}
      ORDER BY VariantsIngredients.variantId
      LIMIT ${limit}
    `);

    const variantsIngredients = await schemas.list.parseAsync(result);

    return variantsIngredients;
  },
  update: async function ({ variantId, ingredientId }, updateVariantsIngredient) {
    const oldVariantsIngredient = await (async () => {

      const result = await db.get(SQL`
        SELECT
          variantId,
          ingredientId
        FROM VariantsIngredients
        WHERE
          VariantsIngredients.variantId = ${variantId}
        AND
          VariantsIngredients.ingredientId = ${ingredientId}
      `);

      if (!result) {
        throw new Error(`404 variantsIngredient not found`);
      }

      // while this isn't strictly true, its close enough for what we need
      const variantsIngredient = await schemas.update.parseAsync(result);

      return variantsIngredient;

    })();

    const mergedVariantsIngredient = { ...oldVariantsIngredient, ...updateVariantsIngredient };

    const result = await db.run(SQL`
      UPDATE VariantsIngredients
      SET
        variantId = ${mergedVariantsIngredient.variantId}
        ingredientId = ${mergedVariantsIngredient.ingredientId}
      WHERE
        VariantsIngredients.variantId = ${variantId}
      AND
        VariantsIngredients.ingredientId = ${ingredientId}
    `);

    const newVariantsIngredient = await this.read({ variantId, ingredientId });

    return newVariantsIngredient;
  }, 
  delete: async function ({ variantId, ingredientId }) {
    const result = await db.run(SQL`
      DELETE FROM VariantsIngredients
      WHERE
        VariantsIngredients.variantId = ${variantId}
      AND
        VariantsIngredients.ingredientId = ${ingredientId}
    `);
    return {
      variantId,
      ingredientId
    };
  },
})