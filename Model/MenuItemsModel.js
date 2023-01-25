const { Schema, model } = require("mongoose");

const ObjectId = Schema.Types.ObjectId;
const v = {type:ObjectId}

const MenuItemsSchema = new Schema({
  name: { type: String },
  description: { type: String },
  ingridients: { type: Array },
  restaurantId: { v  },
  image: { type: String },
  qty: { type: Number },
  price: { type: Number },
});

const MenuItemsModel = model("menuItem", MenuItemsSchema,"menuItems");

module.exports = MenuItemsModel;
