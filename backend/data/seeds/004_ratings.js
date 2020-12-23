const faker = require('faker');

const createRatings = () => ({
  rating: faker.random.float({min:1, max: 5}),
  truck_id: parseInt(faker.random.number({min: 1, max: 99})),
  user_id: parseInt(faker.random.number({min: 1, max: 20})),
})

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  const fakeRatings = [];

  for(let i=0; i < 100; i++) {
    const rating = createRatings();
    // insert ratings
    fakeRatings.push(rating);
  }


  await knex('truck_ratings').insert(fakeRatings);
};
