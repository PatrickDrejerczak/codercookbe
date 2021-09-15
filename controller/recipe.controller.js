const utilsHelper = require("../helpers/utils.helper");
const Recipe = require("../models/Recipes");
const recipeController = {};

recipeController.getAllRecipes = async (req, res, next) => {
  try {
    let recipes = Recipe;
    const response = utilsHelper.sendResponse(
      res,
      200,
      true,
      { recipes },
      null,
      "Get all recipes successfully."
    );
  } catch (error) {
    next(error);
  }
};

// receipeController.match = async (req, res, next) => {
//   //front end will send an array of ingredients
//   const { body } = req;
//   if (!body || body.length === 0) {
//     return next(new Error("401 - Body missing"));
//   }

//   //find only EXACT MATCH of the recipe of the ingredient
//   // target property => receipe.ingredient.name  // receipe.ingredient= [{ingredients:_id},{ingredients:_id},{ingredients:_id}]

//   // recipe:{
//   //   userId:"",
//   //   category:"",
//   //   ingredients:[
//   //     {ingredient:
//   //       {_id: "",
//   //       unit:"",
//   //       qty:""
//   //     }
//   //     },
//   //     {ingredient:
//   //       {_id: "",
//   //       unit:"",
//   //       qty:""
//   //     }
//   //     },{ingredient:
//   //       {_id: "",
//   //       unit:"",
//   //       qty:""
//   //     }
//   //     }

//   //   ]

//   // }

//   const conditions = [];
//   body.map((keyword) => {
//     conditions.push({
//       ingredients: { "ingredients.name": keyword },
//     });
//   });
//   // v.1
//   // ["rice","chicken"]
//   // to [{indredient:{name:rice}},{indredient:{name:chicken}}]
//   // so we could X.find({$and:[{indredient:{name:rice}},{indredient:{name:chicken}}]})
//   // v.2
//   // match only main
//   // v.3 findOne({indredient:{name:rice}})
//   // match with less than unit amount

//   // rice, chicken, tomato -> 1. fried rice with chicken and tomato, 2. rice with chicken, 3. tomato rice, 4. fried chicken , 5. fried rice
//   // exact match  $and
//   // match some $or

//   console.log("my conditions test", conditions);

//   /// select all the keyword in the body
//   const matchExact = await Recipe.find({
//     $and: conditions,
//   });
//   const matchSome = await Recipe.find({
//     $or: conditions,
//   });

//   const recipes = {};
//   recipes.matchExact = matchExact;

//   recipes.matchSome = matchSome;

//   utilsHelper.sendResponse(
//     res,
//     200,
//     true,
//     recipes,
//     null,
//     "Get single recipe successfully."
//   );
// };

recipeController.getSingleRecipe = async (req, res, next) => {
  try {
    const { id } = req.body;
    let recipes = await Recipe.findOne({ id });
    if (!recipes) return next(new Error("401 - Recipe not found."));

    utilsHelper.sendResponse(
      res,
      200,
      true,
      { recipes },
      null,
      "Get single recipe successfully."
    );
  } catch (error) {
    next(error);
  }
};

recipeController.createRecipe = async (req, res, next) => {
  try {
    let { category, ingredient, unit, amount } = req.body;

    let recipes = await Recipe.create({
      category,
      ingredient,
      unit,
      amount,
    });
    console.log(ingredient);
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { recipes },
      null,
      "Created new recipe successfully."
    );
  } catch (error) {
    next(error);
  }
};

recipeController.updateRecipe = async (req, res, next) => {
  try {
    let recipeID = req.params.id;
    let { isSending } = req.body;
    let recipe = await Recipe.findByIdAndUpdate(recipeID, {
      isSending,
    });
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { recipe },
      null,
      "Updated successfully."
    );
  } catch (error) {
    next(error);
  }
};

module.exports = recipeController;
