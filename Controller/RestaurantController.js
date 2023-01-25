const RestaurantsModel = require("../Model/RestaurantsModel");

const MenuItemsModel = require("../Model/MenuItemsModel");

module.exports.getRestaurantList = async (request, response) => {
  let { rest_id } = request.params;
  let result = await RestaurantsModel.findById(rest_id );
  response.send({
    status: true,
    restaurant: result,
  });
};

module.exports.filter = async (request, response) => {
  let { mealtype, location, l_cost, h_cost, sort, cuisine, itemsPerPage,page } = request.body;

  sort = sort ? sort : 1;
  page = page ? page : 1;
  itemsPerPage = itemsPerPage ? itemsPerPage : 2;

  let staringIndex = page * itemsPerPage - itemsPerPage; 
  let lastIndex = page * itemsPerPage; 
  // fvalue = fvalue ? fvalue : 0;
  const filterData = {};
  // console.log(mealtype);
 
  // const h_cost = 500;

  if (mealtype !== undefined) filterData["mealtype_id"] = mealtype;
  if (location !== undefined) filterData["location_id"] = location;
  if (l_cost !== undefined && h_cost !== undefined)
    filterData["min_price"] = { $gt: l_cost, $lt: h_cost };
  if (cuisine !== undefined) filterData["cuisine_id"] = { $in: cuisine };
    console.log(filterData);
  try {
    let result = await RestaurantsModel.find(filterData, {
      _id:1,
      name: 1,
      city: 1,
      locality: 1,
      location_id: 1,
      min_price: 1,
      image: 1,
      cuisine_id: 1,
      cuisine: 1,
      city_id:1,
      thumb:1,
      aggregate_rating:1,
      rating_text:1,
      contact_number:1,
      mealtype_id: 1,
    
    })
      .sort({
        min_price:sort,

      })
   const filterResult = result.slice(staringIndex, lastIndex);

    if (result.length === 0) {
      response.send({
        status: false,
        message: "Restaurant is not found",
      });
    } else {
      response.send({
        status: true,
        restaurants: filterResult,
        pageCount: Math.ceil(result.length / 2),
      });
      console.log(filterResult);
    }
  } catch (error) {
    mongoDbError(error.message);
    response.status(500).send({
      status: false,
      message: "invalid id is passed",
    });
  }
};




module.exports.getMenuItemsByRestID = async (request, response) => {
  let { rest_id } = request.params;
  try {
    let result = await MenuItemsModel.find({ restaurantId:rest_id });
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



module.exports.searchRestaurant = async (request, response) => {
  let { restaurant, loc_id } = request.body;

  let result = await RestaurantsModel.find({
    name: { $regex: restaurant + ".*", $options: "i" },
    location_id: Number(loc_id),
  });
  response.send({
    status: true,
    result,
  });
};
