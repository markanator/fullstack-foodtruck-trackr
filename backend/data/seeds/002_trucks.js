require("dotenv").config();
// const knex = require('knex');
const knexPostgis = require('knex-postgis')
const faker = require('faker');
const db = require('../config');

const slugify = require('slugify');


// knexPostgis(db);
const st = knexPostgis(db);

const cuisineTypes = [
  'American',
  'Mexican',
  'Greek',
  'SeaFood',
  'Vegan',
  'Vegetarian',
  'Chinese',
  'Thai',
  'Dessert',
  'Italian',
  'Filipino',
  'Kosher',
];

const priceRanges = [
  "$",
  "$$",
  "$$$",
]

const userRanges = [
  1,
  2,
  6,
]

const createTrucks = (LONG, LATI) => ({
  name: faker.company.companyName(),
  slug: slugify(faker.company.companyName()),
  hero_image: faker.image.food(1200,600),
  description: faker.lorem.sentences(3),
  cuisine_type: cuisineTypes[faker.random.number(cuisineTypes.length - 1)],
  price_range: priceRanges[faker.random.number(priceRanges.length - 1)],
  address: faker.address.streetAddress(),
  coordinates:  `SRID=4326;POINT(${LONG} ${LATI})`,
  arrival_time: faker.date.past(),
  departure_time: faker.date.future(),
  operator_id: userRanges[faker.random.number(userRanges.length - 1)],
})



exports.seed = async function(KNEX) {

  const fakeTrucks = [];
  // const coordsArr = [];
  const desired = 100;

  // THANKS: @jsundram
  const top = 49.3457868; // # north lat
  const bottom =  24.7433195; // # south lat
  const left = -124.7844079; // # west long
  const right = -66.9513812; // # east long

  for(let i=0; i < desired; i++) {

    const truck = createTrucks(faker.address.longitude(right,left), faker.address.latitude(bottom,top));

    fakeTrucks.push(truck);
  }

  // console.log(fakeTrucks[0].coordinates);
  // Deletes ALL existing entries
  await KNEX('trucks').insert(fakeTrucks);
};
