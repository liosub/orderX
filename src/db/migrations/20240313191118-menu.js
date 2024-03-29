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
    await queryInterface.createTable('menu', {
      menu_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        primaryKey: true
      },
      menuTitle: {
        type: Sequelize.STRING,
      },
      menuDetails: {
        type: Sequelize.STRING,
      },
      font: {
        type: Sequelize.STRING,
      },
      accent: {
        type: Sequelize.STRING,
      },
      profile_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'profile', // name of Target model
          key: 'profile_id', // key in Target model that we're referencing
        },
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE',
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    }
    );

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('menu');

  }
};
