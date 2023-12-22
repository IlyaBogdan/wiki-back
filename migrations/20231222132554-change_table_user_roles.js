'use strict';

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.addColumn('user_roles', 'organisationId', { 
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'organisations'
        },
        key: 'id'
      },
      defaultValue: 1,
      allowNull: false
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('user_roles', 'organisationId');
  }
};
