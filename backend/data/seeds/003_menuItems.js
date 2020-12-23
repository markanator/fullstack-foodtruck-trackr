const faker = require('faker');

const createItems = () => ({
  item_name: faker.commerce.productName(),
  item_description: faker.lorem.sentence(15, 10),
  item_photo: faker.image.food(300,300),
  item_price: parseInt(faker.commerce.price().slice(0,1)),
  truck_id: faker.random.number(99),
})


exports.seed = function(knex) {

  const fakeMenuItems = [];

  for(let i=0; i < 150; i++) {

    const menuItem = createItems();

    fakeMenuItems.push(menuItem);
  }

  return knex('menu_item').insert(fakeMenuItems);
};
