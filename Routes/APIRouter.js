const express = require("express");
const router = express.Router();
const location = require("../Controller/LocationController");
const restaurant = require("../Controller/RestaurantController");
const mealType = require("../Controller/MealTypeController");
const menuItem = require("../Controller/MenuItemsController");
const payment = require("../Controller/PaymentController")
const order = require("../Controller/OrdersController")
router.get("/api", (request, response) => {
  response.send("welcome to api");
});

router.get("/api/get-location-list", location.getLocationList);
router.get("/api/get-order-datails/:email", order.getOrderDetails);
router.post("/api/search-restaurant", restaurant.searchRestaurant);

router.get("/api/restaurant-list/:rest_id", restaurant.getRestaurantList);
router.get("/api/meal-type", mealType.getmealTypeList);
router.get("/api/meal-type-name/:meal_id", mealType.getmealTypeName);
router.get("/api/get-menu-items/:res_id", menuItem.getMenuItemsByRestID);

router.post("/api/filter/", restaurant.filter);


router.post("/api/gen-order-id" ,payment.genOrderId)
router.post("/api/verify-payment", payment.verifyPayment);




module.exports = router;
