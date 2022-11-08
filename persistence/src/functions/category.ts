import SQL from 'sql-template-tag';
import { randomUUID } from 'crypto';
import type { CRLUD } from '../CRLUD';
import { category as schemas } from '@burger-shop/schemas/src/category';
import type { DB } from "../database";

export const category = (db: DB): CRLUD<typeof schemas> => ({
  create: async function (newCategory) {
    const categoryId = randomUUID()
    const result = await db.run(SQL`
      INSERT INTO Categories (
        categoryId,
        name,
        description
      ) VALUES (
        ${categoryId},
        ${newCategory.name},
        ${newCategory.description}
      )
    `);
    return { categoryId }
  },
  read: async function ({ categoryId }) {
    const result = await db.get(SQL`
      SELECT
        categoryId,
        name,
        description
      FROM Categories
      WHERE categoryId = ${categoryId}
    `);

    if (!result) {
      throw new Error(`404 category not found`)
    }

    const category = await schemas.item.parseAsync(result)

    return category
  },
  list: async function ({ cursor, limit }) {
    const result = await db.all(SQL`
      SELECT
        categoryId,
        name,
        description
      FROM Categories
      WHERE categoryId > ${cursor}
      ORDER BY categoryId
      LIMIT ${limit}
    `);

    const categories = await schemas.list.parseAsync(result);

    return categories
  },
  update: async function ({ categoryId }, updateCategory) {
    const oldCategory = await (async () => {

      const result = await db.get(SQL`
        SELECT
          name,
          description
        FROM Categories
        WHERE categoryId = ${categoryId}
      `)

      if (!result) {
        throw new Error(`404 category not found`);
      }

      const category = await schemas.update.parseAsync(result);

      return category

    })()

    const mergedCategory = { ...oldCategory, ...updateCategory }

    const result = await db.run(SQL`
      UPDATE Categories
      SET
        name = ${mergedCategory.name},
        description = ${mergedCategory.description}
      WHERE
        categoryId = ${categoryId}
    `);

    const newCategory = await this.read({ categoryId })

    return newCategory
  },
  delete: async function ({ categoryId }) {
    const result = await db.run(SQL`
      DELETE FROM Categories
      WHERE
        categoryId = ${categoryId}
    `);
    return {
      categoryId
    }
  },
})