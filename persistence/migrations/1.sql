CREATE TABLE "Burgers" (
	"burgerId"	TEXT NOT NULL UNIQUE,
	"categoryId"	TEXT NOT NULL,
	"imageId"	TEXT NOT NULL,
	"name"	TEXT NOT NULL,
	"description"	TEXT NOT NULL,
	"price"	INTEGER NOT NULL,
	FOREIGN KEY("categoryId") REFERENCES "Categories"("categoryId"),
	FOREIGN KEY("imageId") REFERENCES "Images"("imageId"),
	PRIMARY KEY("burgerId")
);

CREATE TABLE "Variants" (
	"variantId"	TEXT NOT NULL UNIQUE,
	"burgerId"	TEXT NOT NULL,
	"variantNameId"	TEXT NOT NULL,
	"imageId"	TEXT NOT NULL,
	"calories"	INTEGER NOT NULL,
	FOREIGN KEY("burgerId") REFERENCES "Burgers"("burgerId"),
	FOREIGN KEY("variantNameId") REFERENCES "VariantNames"("variantNameId"),
	FOREIGN KEY("imageId") REFERENCES "Images"("imageId"),
	PRIMARY KEY("variantId")
);

CREATE TABLE "VariantNames" (
	"variantNameId"	TEXT NOT NULL UNIQUE,
	"name"	TEXT NOT NULL,
	PRIMARY KEY("variantNameId")
);

CREATE TABLE "Ingredients" (
	"ingredientId"	TEXT NOT NULL UNIQUE,
	"name"	TEXT,
	PRIMARY KEY("ingredientId")
);

CREATE TABLE "VariantsIngredients" (
	"variantId"	TEXT NOT NULL,
	"ingredientId"	TEXT NOT NULL,
	FOREIGN KEY("ingredientId") REFERENCES "Ingredients"("ingredientId"),
	FOREIGN KEY("variantId") REFERENCES "Variants"("variantId"),
	PRIMARY KEY("variantId","ingredientId")
);

CREATE TABLE "Tags" (
	"tagId"	TEXT NOT NULL UNIQUE,
	"name"	TEXT,
	PRIMARY KEY("tagId")
);

CREATE TABLE "VariantsTags" (
	"variantId"	TEXT NOT NULL,
	"tagId"	TEXT NOT NULL,
	FOREIGN KEY("tagId") REFERENCES "Tags"("tagId"),
	FOREIGN KEY("variantId") REFERENCES "Variants"("variantId"),
	PRIMARY KEY("variantId","tagId")
);

CREATE TABLE "Categories" (
	"categoryId"	TEXT NOT NULL UNIQUE,
	"name"	TEXT NOT NULL,
	"description"	TEXT NOT NULL,
	PRIMARY KEY("categoryId")
);

CREATE TABLE "Images" (
	"imageId"	TEXT NOT NULL UNIQUE,
	"url"	TEXT,
	PRIMARY KEY("imageId")
);