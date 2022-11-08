import { web } from "./web"

import { getMenuSchema } from '@burger-shop/core/src/menu/getMenu';

import { getMenuItemSchema } from "@burger-shop/core/src/menu/getMenuItem"
import { BurgerId } from "@burger-shop/schemas/src/burger"

import { getVariantSchema } from "@burger-shop/core/src/menu/getVariant"
import { VariantId } from "@burger-shop/schemas/src/variant"

export const burgerShop = {
  menu: () => web.get(getMenuSchema)(`/menu`),
  burger: ({ burgerId }: BurgerId) => web.get(getMenuItemSchema)(`/burger?burgerId=${burgerId}`),
  variant: ({ variantId }: VariantId) => web.get(getVariantSchema)(`/variant?variantId=${variantId}`),
}