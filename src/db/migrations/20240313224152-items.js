'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('items', {
      item_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        primaryKey: true
      },
      sectionTitle: {
        type: Sequelize.STRING,
      },
      sectionDescription: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.DOUBLE,
      },
      allergens: {
        type: Sequelize.STRING,
      },
      specialOffer: {
        type: Sequelize.DOUBLE,
      },
      itemState: {
        type: Sequelize.ENUM({
          values: ['SOLD_OUT','NOT_AVAILABLE']
        }),
      },
      menu_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'menu', // name of Target model
          key: 'menu_id', // key in Target model that we're referencing
        },
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE',
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('items');

  }
};
