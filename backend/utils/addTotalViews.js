const Truck = require("../models/Truck");

const addTotalTruckViews = async (user) => {

  if (user.user_role === "operator") {
    const trucks = await Truck.find({ operator_id: user.id });

    const totalViews = trucks.reduce((acc,curr)=>{
      return acc + curr.views;
    }, 0);

    user.totalTruckViews = totalViews;
  }

  return user;
};
module.exports = addTotalTruckViews;
