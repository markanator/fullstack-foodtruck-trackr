const slugify = require('slugify');


const editTruckRequirements = (req, res, next) => {
  const slug = slugify(req.body.name || req.truck.name);

  req.truckData = {
    name: req.body.name || req.truck.name,
    slug,
    hero_image: req.body.hero_image || req.truck.hero_image,
    description: req.body.description || req.truck.description,
    address: req.body.address || req.truck.address,
    cuisine_type: req.body.cuisine_type || req.truck.cuisine_type,
    price_range: req.body.price_range || req.truck.price_range,
    departure_time: req.body.departure_time || req.truck.departure_time,
    arrival_time: req.body.arrival_time || req.truck.arrival_time,
  };
  next();
};

module.exports = editTruckRequirements;
