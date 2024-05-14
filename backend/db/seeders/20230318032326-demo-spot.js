'use strict';


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: "123 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Beach House",
        description: "Place where web developers are created",
        price: 123
      },
      {
        ownerId: 2,
        address: "1234 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Jungle House",
        description: "Place where web developers are created",
        price: 1234
      },
      {
        ownerId: 1,
        address: "1234 Disney Lane",
        city: "New York City",
        state: "New York",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Cabin in Woods",
        description: "Place where web developers are created",
        price: 1234
      },
      {
        ownerId: 2,
        address: "1234 Disney Lane",
        city: "New York City",
        state: "New York",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Nature House",
        description: "Place where web developers are created",
        price: 1234
      },
      {
        ownerId: 2,
        address: "1234 Disney Lane",
        city: "Houston",
        state: "Taxes",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Jungle House",
        description: "Place where web developers are created",
        price: 1234
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1, 2] }
    }, {});
  }
};
