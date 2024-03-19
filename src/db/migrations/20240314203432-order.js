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
    await queryInterface.createTable('order', {
      order_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      roomNo: {
        type: Sequelize.INTEGER,
      },
      tableNo: {
        type: Sequelize.INTEGER,
      },
      customerName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.BIGINT,
      },
      orderDetails: {
        type: Sequelize.STRING
      },
      revenue: {
        type: Sequelize.BIGINT
      },
      status: {
        type: Sequelize.STRING
      },
      notes: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('order');

  }
};
