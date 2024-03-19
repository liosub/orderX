/* eslint-disable quotes */
import { Options, Sequelize } from 'sequelize';
import Profile from './Profile';
import Menu from './Menu';
import Items from './Items';
import Order from './Order';
import OrderItems from './OrderItems';

const dbConfig = require('../config');
const config = dbConfig.development;


class SequelizeServer {
  sequelize: Sequelize;

  constructor(options: Options) {
    this.sequelize = new Sequelize(options);
    this.initModels();
    this.setupRelations();
    // this.syncSequelize();
  }

  // Add created models here for initialization
  private initModels() {
    Profile.initModel(this.sequelize);
    Menu.initModel(this.sequelize);
    Items.initModel(this.sequelize);
    Order.initModel(this.sequelize);
    OrderItems.initModel(this.sequelize);
  }

  // Set up data relationships
  private setupRelations() {
    const models  = this.sequelize.models;
    Object.keys(models).forEach(name => {
      if ('associate' in models[name]) {
        (models[name] as any).associate(models);
      }
    });
  }

  // Sync to the database
  private syncSequelize() {
    this.sequelize
      .sync()
      .then(() => console.info('sequelize sync database'))
      .catch((err) => {
        console.error(JSON.stringify(err));
      });
  }
}

const sequelizeServer = new SequelizeServer({ ...config, logging: false });

// export models
export {
  sequelizeServer,
  Profile,
  Menu,
  Items,
  Order,OrderItems
};
