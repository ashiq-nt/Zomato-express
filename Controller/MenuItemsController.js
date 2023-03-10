const MenuItemsModel = require("../Model/MenuItemsModel");

module.exports.getMenuItemsByRestID = async (request, response) => {
  let { res_id } = request.params;
  try {
    let result = await MenuItemsModel.find({ restaurantId: res_id });
    response.status(200).send({
      status: true,
      menu_items: result,
    });
  } catch (error) {
    mongoDbError(error.message);
    response.status(500).send({
      status: false,
      message: "Invalid id is passed",
    });
  }
};
