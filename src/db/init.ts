require('dotenv').config()

import { Items, Menu, Profile ,Order, OrderItems, sequelizeServer} from "./models"

const dev = process.env.NODE_ENV === 'development'
const test = process.env.NODE_ENV !== 'test'

const dbInit = () => Promise.all([
    // Profile.sync({ alter: dev || test }),
    // // Items.sync({ alter: dev || test }),
    // Menu.sync({ alter: dev || test }),
    // // Order.sync({ alter: dev || test }),
    // // OrderItems.sync({ alter: dev || test }),
    
    // sequelizeServer.sequelize
  ])


export default dbInit ;