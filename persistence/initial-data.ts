// All blatantly stolen from https://www.grilld.com.au/menu
// thank you for the delicious burgers :)
import { database } from "./src";

const db = await database()


const variantNames = {
  "Traditional Bun": await db.variantName.create({ name: "Traditional Bun" }),
  "Panini": await db.variantName.create({ name: "Panini" }),
  "Gluten Free Bun": await db.variantName.create({ name: "Gluten Free Bun" }),
  "Low Card SuperBun": await db.variantName.create({ name: "Low Card SuperBun" }),
  "No Bun": await db.variantName.create({ name: "No Bun" }),
}

const getVariantNameId = (VariantName: keyof typeof variantNames) => {
  return variantNames[VariantName].variantNameId
}

const tags = {
  "Dairy Free": await db.tag.create({ name: "Dairy Free" }),
  "Gluten Friendly": await db.tag.create({ name: "Gluten Friendly" }),
  "Low Carb": await db.tag.create({ name: "Low Carb" }),
}

const getTagId = (tag: keyof typeof tags) => {
  return tags[tag].tagId
}

const ingredients = {
  "Beef Pattie": await db.ingredient.create({ name: "Beef Pattie" }),
  "Sugar": await db.ingredient.create({ name: "Sugar" }),
  "Vinegar": await db.ingredient.create({ name: "Vinegar" }),
  "Onion": await db.ingredient.create({ name: "Onion" }),
  "Starch": await db.ingredient.create({ name: "Starch" }),
  "Tomato Paste": await db.ingredient.create({ name: "Tomato Paste" }),
  "Salt": await db.ingredient.create({ name: "Salt" }),
  "Spices": await db.ingredient.create({ name: "Spices" }),
  "Garlic": await db.ingredient.create({ name: "Garlic" }),
  "Parsley": await db.ingredient.create({ name: "Parsley" }),
  "Tomato": await db.ingredient.create({ name: "Tomato" }),
  "Tomato Relish": await db.ingredient.create({ name: "Tomato Relish" }),
  "Water": await db.ingredient.create({ name: "Water" }),
  "Relish": await db.ingredient.create({ name: "Relish" }),
  "Apple Cider Vinegar": await db.ingredient.create({ name: "Apple Cider Vinegar" }),
  "Tapioca Starch": await db.ingredient.create({ name: "Tapioca Starch" }),
  "Mustard Seed": await db.ingredient.create({ name: "Mustard Seed" }),
  "Citric Acid": await db.ingredient.create({ name: "Citric Acid" }),
  "Cos Lettuce": await db.ingredient.create({ name: "Cos Lettuce" }),
  "Herb Mayonnaise": await db.ingredient.create({ name: "Herb Mayonnaise" }),
  "Canola Oil": await db.ingredient.create({ name: "Canola Oil" }),
  "Pasteurised Free Range Whole Egg": await db.ingredient.create({ name: "Pasteurised Free Range Whole Egg" }),
  "Liquid Sugar": await db.ingredient.create({ name: "Liquid Sugar" }),
  "White Vinegar": await db.ingredient.create({ name: "White Vinegar" }),
  "Mustard": await db.ingredient.create({ name: "Mustard" }),
  "Herbs & Spices": await db.ingredient.create({ name: "Herbs & Spices" }),
  "Corn Starch": await db.ingredient.create({ name: "Corn Starch" }),
  "Lemon Juice": await db.ingredient.create({ name: "Lemon Juice" }),
  "Acidity Regulator": await db.ingredient.create({ name: "Acidity Regulator" }),
  "Citric": await db.ingredient.create({ name: "Citric" }),
  "Spanish Onion": await db.ingredient.create({ name: "Spanish Onion" }),
  "Beef meat": await db.ingredient.create({ name: "Beef meat" }),
  "Traditional Bun": await db.ingredient.create({ name: "Traditional Bun" }),
  "Wheat Flour": await db.ingredient.create({ name: "Wheat Flour" }),
  "Folic Acid": await db.ingredient.create({ name: "Folic Acid" }),
  "Thiamin": await db.ingredient.create({ name: "Thiamin" }),
  "Sesame Seeds": await db.ingredient.create({ name: "Sesame Seeds" }),
  "Wheat Meal": await db.ingredient.create({ name: "Wheat Meal" }),
  "Yeast": await db.ingredient.create({ name: "Yeast" }),
  "Wheat Gluten": await db.ingredient.create({ name: "Wheat Gluten" }),
  "Rice Flour": await db.ingredient.create({ name: "Rice Flour" }),
  "Malt Flour": await db.ingredient.create({ name: "Malt Flour" }),
  "Ascorbic Acid": await db.ingredient.create({ name: "Ascorbic Acid" }),
  "CitriVitamin Cc": await db.ingredient.create({ name: "Vitamin C" }),
  "Wheat Enzyme": await db.ingredient.create({ name: "Wheat Enzyme" }),
  "Vitamin C": await db.ingredient.create({ name: "Vitamin C" }),
  "Panini Bun": await db.ingredient.create({ name: "Panini Bun" }),
  "Gluten FreeBun": await db.ingredient.create({ name: "Gluten FreeBun" }),
  "Buckwheat Flour": await db.ingredient.create({ name: "Buckwheat Flour" }),
  "Coconut Cream": await db.ingredient.create({ name: "Coconut Cream" }),
  "Rice Flour Fine": await db.ingredient.create({ name: "Rice Flour Fine" }),
  "Potato Starch": await db.ingredient.create({ name: "Potato Starch" }),
  "Caster Sugar": await db.ingredient.create({ name: "Caster Sugar" }),
  "Coconut Sugar": await db.ingredient.create({ name: "Coconut Sugar" }),
  "Psyllium Husk": await db.ingredient.create({ name: "Psyllium Husk" }),
  "Psyllium Husk Whole": await db.ingredient.create({ name: "Psyllium Husk Whole" }),
  "Guar Gum": await db.ingredient.create({ name: "Guar Gum" }),
  "Xanthan Gum": await db.ingredient.create({ name: "Xanthan Gum" }),
  "Low Carb SuperBun": await db.ingredient.create({ name: "Low Carb SuperBun" }),
  "Free Range Whole Egg": await db.ingredient.create({ name: "Free Range Whole Egg" }),
  "Almond Meal": await db.ingredient.create({ name: "Almond Meal" }),
  "Filtered": await db.ingredient.create({ name: "Filtered" }),
  "Honey": await db.ingredient.create({ name: "Honey" }),
  "Iodised Salt": await db.ingredient.create({ name: "Iodised Salt" }),
  "Acacia Gum": await db.ingredient.create({ name: "Acacia Gum" }), 
} 

const getIngredient = (ingredient: keyof typeof ingredients) => {
  return ingredients[ingredient].ingredientId
}

const addManyIngredients = async (variantId: string, ingredientsArray: Array<keyof typeof ingredients>) => {
  const distinctIngredients = [...new Set(ingredientsArray)]
  for await (const ingredient of distinctIngredients) {
    await db.variantsIngredient.create({
      variantId,
      ingredientId: getIngredient(ingredient)
    })
  }
}

// using closures here just to keep names simple

// Beef
await (async () => {

  const { categoryId } = await db.category.create({ 
    name: "Beef", 
    description: "100% Australian grass-fed, free-range beef patties made with a sprinkle of herbs and a spoonful or two of our famous relish. They’re free from artificial colours, flavours, preservatives, antibiotics and all added hormones." 
  })

  // Simply Grill'd
  await (async () => {

    const { imageId } = await db.image.create({ 
      url: "https://assets.grilld.com.au/images/ProductsHD/Burgers/_crop185/BEEF_Simply_Grilld_Traditional@2x.png?mtime=20220530142130" 
    })

    const { burgerId } = await db.burger.create({ 
      name: "Simply Grill'd", 
      description: "Grass-fed beef pattie with cos lettuce, tomato, Spanish onion, relish & herbed mayo.", 
      price: 11.90, 
      categoryId, 
      imageId 
    })

    await (async () => {

      const { imageId } = await db.image.create({
        url: "https://assets.grilld.com.au/images/ProductsHD/Burgers/_crop500x360/BEEF_Simply_Grilld_Traditional@2x.png?mtime=20220530142130"
      })

      const { variantId } = await db.variant.create({
        burgerId,
        imageId,
        variantNameId: getVariantNameId("Traditional Bun"),
        calories: 2510
      })

      await db.variantsTag.create({
        variantId,
        tagId: getTagId("Dairy Free")
      })

      
      await addManyIngredients(variantId, [
        "Beef Pattie", "Beef meat", "Relish", "Tomato", "Acidity Regulator", "Citric Acid",
        "Sugar", "Vinegar", "Onion", "Starch", "Tomato Paste", "Salt", "Spices", "Garlic",
        "Salt", "Parsley", "Traditional Bun", "Wheat Flour" , "Folic Acid", "Thiamin",
        "Water", "Sesame Seeds", "Canola Oil", "Wheat Meal", "Yeast", "Wheat Gluten",
        "Salt", "Rice Flour", "Malt Flour", "Ascorbic Acid", "Vitamin C", "Wheat Enzyme",
        "Tomato", "Tomato Relish", "Sugar", "Water", "Onion", "Apple Cider Vinegar",
        "Tapioca Starch", "Salt", "Tomato Paste", "Mustard Seed", "Citric Acid",
        "Spices", "Cos Lettuce", "Herb Mayonnaise", "Canola Oil", "Pasteurised Free Range Whole Egg",
        "Liquid Sugar", "Water", "White Vinegar", "Mustard", "Salt", "Herbs & Spices",
        "Corn Starch", "Lemon Juice", "Acidity Regulator", "Citric", "Spanish Onion"
      ])

    })() 

    await (async () => {

      const { imageId } = await db.image.create({
        url: "https://assets.grilld.com.au/images/ProductsHD/Burgers/_crop500x360/BEEF_Simply_Grilld_Panini@2x.png?mtime=20220530142111"
      })

      const { variantId } = await db.variant.create({
        burgerId,
        imageId,
        variantNameId: getVariantNameId("Panini"),
        calories: 2520
      })

      await db.variantsTag.create({
        variantId,
        tagId: getTagId("Dairy Free")
      })

      await addManyIngredients(variantId, [
        "Beef Pattie", "Beef meat", "Relish", "Tomato", "Tomato", "Acidity Regulator", 
        "Citric Acid", "Sugar", "Vinegar", "Onion", "Starch", "Tomato Paste", "Salt", 
        "Spices", "Garlic", "Salt", "Parsley", "Panini Bun", "Wheat Flour", "Wheat Flour", 
        "Folic Acid", "Thiamin", "Water", "Canola Oil", "Yeast", "Salt", "Wheat Gluten", 
        "Rice Flour", "Malt Flour", "Ascorbic Acid", "Vitamin C", "Wheat Enzyme", "Tomato", 
        "Tomato Relish", "Tomato", "Sugar", "Water", "Onion", "Apple Cider Vinegar", 
        "Tapioca Starch", "Salt", "Tomato Paste", "Mustard Seed", "Citric Acid", "Spices", 
        "Cos Lettuce", "Herb Mayonnaise", "Canola Oil", "Pasteurised Free Range Whole Egg", 
        "Liquid Sugar", "Water", "White Vinegar", "Mustard", "Salt", "Herbs & Spices", 
        "Corn Starch", "Lemon Juice", "Acidity Regulator", "Citric", "Spanish Onion"
      ])

    })() 

    await (async () => {

      const { imageId } = await db.image.create({
        url: "https://assets.grilld.com.au/images/ProductsHD/Burgers/_crop500x360/BEEF_Simply_Grilld_GF@2x.png?mtime=20220530142032"
      })

      const { variantId } = await db.variant.create({
        burgerId,
        imageId,
        variantNameId: getVariantNameId("Gluten Free Bun"),
        calories: 2990
      })

      await db.variantsTag.create({
        variantId,
        tagId: getTagId("Dairy Free")
      })

      await db.variantsTag.create({
        variantId,
        tagId: getTagId("Gluten Friendly")
      })

      await addManyIngredients(variantId, [
        "Gluten FreeBun", "Water", "Buckwheat Flour", "Coconut Cream", "Tapioca Starch", 
        "Rice Flour", "Rice Flour Fine", "Potato Starch", "Canola Oil", "Caster Sugar", 
        "Coconut Sugar", "Salt", "Yeast", "Psyllium Husk", "Psyllium Husk Whole", "Guar Gum", 
        "Xanthan Gum", "Sesame Seeds", "Beef Pattie", "Beef meat", "Relish", "Tomato", "Tomato", 
        "Acidity Regulator", "Citric Acid", "Sugar", "Vinegar", "Onion", "Starch", 
        "Tomato Paste", "Salt", "Spices", "Garlic", "Salt", "Parsley", "Tomato", 
        "Tomato Relish", "Tomato", "Sugar", "Water", "Onion", "Apple Cider Vinegar", 
        "Tapioca Starch", "Salt", "Tomato Paste", "Mustard Seed", "Citric Acid", "Spices", 
        "Cos Lettuce", "Herb Mayonnaise", "Canola Oil", "Pasteurised Free Range Whole Egg", 
        "Liquid Sugar", "Water", "White Vinegar", "Mustard", "Salt", "Herbs & Spices", 
        "Corn Starch", "Lemon Juice", "Acidity Regulator", "Citric", "Spanish Onion"
      ])

    })() 

    await (async () => {

      const { imageId } = await db.image.create({
        url: "https://assets.grilld.com.au/images/ProductsHD/Burgers/_crop500x360/BEEF_Simply_Grilld_LowCarb@2x.png?mtime=20220530142052"
      })

      const { variantId } = await db.variant.create({
        burgerId,
        imageId,
        variantNameId: getVariantNameId("Low Card SuperBun"),
        calories: 2670
      })

      await db.variantsTag.create({
        variantId,
        tagId: getTagId("Dairy Free")
      })

      await db.variantsTag.create({
        variantId,
        tagId: getTagId("Low Carb")
      })

      await db.variantsTag.create({
        variantId,
        tagId: getTagId("Gluten Friendly")
      })

      await addManyIngredients(variantId, [
        "Beef Pattie", "Beef meat", "Relish", "Tomato", "Tomato", "Acidity Regulator", 
        "Citric Acid", "Sugar", "Vinegar", "Onion", "Starch", "Tomato Paste", "Salt", 
        "Spices", "Garlic", "Salt", "Parsley", "Low Carb SuperBun", "Free Range Whole Egg", 
        "Almond Meal", "Water", "Filtered", "Coconut Cream", "Tapioca Starch", 
        "Psyllium Husk", "Honey", "Iodised Salt", "Acacia Gum", "Tomato", "Tomato Relish", 
        "Tomato", "Sugar", "Water", "Onion", "Apple Cider Vinegar", "Tapioca Starch", 
        "Salt", "Tomato Paste", "Mustard Seed", "Citric Acid", "Spices", "Cos Lettuce", 
        "Herb Mayonnaise", "Canola Oil", "Pasteurised Free Range Whole Egg", 
        "Liquid Sugar", "Water", "White Vinegar", "Mustard", "Salt", "Herbs & Spices", 
        "Corn Starch", "Lemon Juice", "Acidity Regulator", "Citric", "Spanish Onion"
      ])

    })()

    await (async () => {

      const { imageId } = await db.image.create({
        url: "https://assets.grilld.com.au/images/Products/Burgers/_crop500x360/Grilld_NoBun.png?mtime=20201112093252"
      })

      const { variantId } = await db.variant.create({
        burgerId,
        imageId,
        variantNameId: getVariantNameId("No Bun"),
        calories: 1840
      })

      await db.variantsTag.create({
        variantId,
        tagId: getTagId("Dairy Free")
      })

      await db.variantsTag.create({
        variantId,
        tagId: getTagId("Low Carb")
      })

      await db.variantsTag.create({
        variantId,
        tagId: getTagId("Gluten Friendly")
      })

      await addManyIngredients(variantId, [
        "Beef Pattie", "Relish", "Tomato", "Acidity Regulator", "Citric Acid",
        "Sugar", "Vinegar", "Onion", "Starch", "Tomato Paste", "Salt", "Spices",
        "Garlic", "Salt", "Parsley", "Tomato", "Tomato Relish", "Tomato",
        "Sugar", "Water", "Onion", "Apple Cider Vinegar", "Tapioca Starch", "Salt",
        "Tomato Paste", "Mustard Seed", "Citric Acid", "Spices", "Cos Lettuce",
        "Herb Mayonnaise", "Canola Oil", "Pasteurised Free Range Whole Egg",
        "Liquid Sugar", "Water", "White Vinegar", "Mustard", "Salt", "Herbs & Spices",
        "Corn Starch", "Lemon Juice", "Acidity Regulator", "Citric", "Spanish Onion"
      ])

    })()


  })()

})()
