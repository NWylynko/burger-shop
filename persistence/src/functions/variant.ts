import { variant as schemas, type VariantLookup, type VariantList } from "@burger-shop/schemas/src/variant";
import { randomUUID } from 'crypto';
import SQL from 'sql-template-tag';
import type { CRLUD, LookupItems } from "../CRLUD";
import type { DB } from "../database";

type VariantFunctions = CRLUD<typeof schemas> & {

  // here I am explicitly stating that im only implmenting lookup by burgerId
  // right now, in the future I could cover more of the ids if I see the need
  lookup: LookupItems<Pick<VariantLookup, "burgerId">, VariantList> 
}

export const variant = (db: DB): VariantFunctions => ({
  create: async function (newVariant) {
    const variantId = randomUUID();
    const result = await db.run(SQL`
      INSERT INTO Variants (
        variantId,
        burgerId,
        variantNameId,
        imageId,
        calories
      ) VALUES (
        ${variantId},
        ${newVariant.burgerId},
        ${newVariant.variantNameId},
        ${newVariant.imageId},
        ${newVariant.calories}
      )
    `);
    return {
      variantId,
    };
  },
  read: async function ({ variantId }) {
    const result = await db.get(SQL`
      SELECT
        Variants.variantId,
        Variants.calories,
        Variants.burgerId,
        VariantNames.name as name,
        Images.url as imageUrl
      FROM Variants, VariantNames, Images
      WHERE variantId = ${variantId}
      AND Variants.variantNameId = VariantNames.variantNameId
      AND Variants.imageId = Images.imageId
    `);

    if (!result) {
      throw new Error(`404 variant not found`);
    }

    const variant = await schemas.item.parseAsync(result);

    return variant;

  },
  list: async function ({ cursor, limit }) {
    const result = await db.all(SQL`
      SELECT
        Variants.variantId,
        Variants.calories,
        Variants.burgerId,
        VariantNames.name as name,
        Images.url as imageUrl
      FROM Variants, VariantNames, Images
      WHERE variantId > ${cursor}
      AND Variants.variantNameId = VariantNames.variantNameId
      AND Variants.imageId = Images.imageId
      ORDER BY variantId
      LIMIT ${limit}
    `);

    const variant = await schemas.list.parseAsync(result);

    return variant;
  },
  update: async function ({ variantId }, updateVariant) {
    const oldVariant = await (async () => {

      const result = await db.get(SQL`
        SELECT
          calories,
          burgerId,
          imageId,
          variantNameId
        FROM Variants
        WHERE
          variantId = ${variantId}
      `);

      if (!result) {
        throw new Error(`404 variant not found`);
      }

      // while this isn't strictly true, its close enough for what we need
      const variant = await schemas.update.parseAsync(result);

      return variant;

    })();

    const mergedVariant = { ...oldVariant, ...updateVariant };

    const result = await db.run(SQL`
      UPDATE Variants
      SET
        calories = ${mergedVariant.calories},
        burgerId = ${mergedVariant.burgerId},
        imageId = ${mergedVariant.imageId},
        variantNameId = ${mergedVariant.variantNameId},
      WHERE
        variantId = ${variantId}
    `);

    const newVariant = await this.read({ variantId });

    return newVariant;
  }, 
  delete: async function ({ variantId }) {
    const result = await db.run(SQL`
      DELETE FROM Variants
      WHERE
        variantId = ${variantId}
    `);
    return {
      variantId,
    };
  },
  lookup: async function ({ burgerId }, { cursor, limit }) {
    
    if (burgerId !== undefined) {

      const result = await db.all(SQL`
        SELECT
          Variants.variantId,
          Variants.calories,
          Variants.burgerId,
          VariantNames.name as name,
          Images.url as imageUrl
        FROM Variants, VariantNames, Burgers, Images
        WHERE variantId > ${cursor}
        AND Variants.variantNameId = VariantNames.variantNameId
        AND Variants.imageId = Images.imageId
        AND Variants.burgerId = Burgers.burgerId
        AND Burgers.burgerId = ${burgerId}
        ORDER BY variantId
        LIMIT ${limit}
      `);

      const variant = await schemas.list.parseAsync(result);

      return variant;
      
    } else {

      throw new Error(`lookup of variant by the id you passed through is not supported`)

    }

  }
})