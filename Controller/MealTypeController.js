const MealTypeModels = require("../Model/MealTypeModel");

module.exports.getmealTypeList = async (request, response) => {
  let result = await MealTypeModels.find();
  response.send({
    status: true,
    location: result,
  });
};

module.exports.getmealTypeName = async (request, response) => {
  let { meal_id } = request.body;
  try {
    let result = await MealTypeModels.find({ meal_type: meal_id });
    response.status(200).send({
      status: true,
      location: result,
    });
  } catch (error) {
    mongoDbError(error.message);
    response.status(500).send({
      status: false,
      message: "Invalid id is passed",
    });
  }
};
