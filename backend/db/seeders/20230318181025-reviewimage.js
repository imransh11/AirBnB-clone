'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkInsert(options, [
      {
        reviewId: 1,
        url: "image url"
      },
      {
        reviewId: 2,
        url: "image url"
      },
      {
        reviewId: 2,
        url: "image url"
      },
      {
        reviewId: 3,
        url: "image url"
      },
      {
        reviewId: 4,
        url: "image url"
      },
      {
        reviewId: 5,
        url: "image url"
      },
      {
        reviewId: 5,
        url: "image url"
      },
      {
        reviewId: 6,
        url: "image url"
      },
      {
        reviewId: 6,
        url: "image url"
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      reviewId: { [Op.in]: [1, 2, 3, 4, 5, 6]}
    }, {})
  }
};
