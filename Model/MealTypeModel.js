const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MealTypeModelsSchema = new Schema({
    // _id:{type:Number},
  name: { type: String },
  content: { type: String },
  image: { type: String },
  meal_type:{ type: Number },
});

const MealTypeModels = mongoose.model("mealtype", MealTypeModelsSchema, "mealTypes");
module.exports = MealTypeModels;
