const faker = require('faker');

const createFavs = () => ({
  truck_id: parseInt(faker.datatype.number({min: 1, max: 99})),
  user_id: parseInt(faker.datatype.number({min: 1, max: 20})),
})

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  const fakeFavs = [];

  for(let i=0; i < 100; i++) {
    const fakefavorite = createFavs();
    // insert ratings
    fakeFavs.push(fakefavorite);
  }


  await knex('user_trucks_favorites').insert(fakeFavs);
};
