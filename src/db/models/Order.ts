import { DataTypes, Model, Optional ,Sequelize,ModelAttributes} from 'sequelize'
import Profile from './Profile';
import Menu from './Menu';
import Items from './Items';
import OrderItems from './OrderItems';


interface OrderAttributes{
    order_id:number;
    roomNo?:number;
    tableNo?:number;
    customerName:string;
    email:string;
    phone?:number;
    orderDetails?:string;
    revenue?:number;
    status?:string;
    notes?:string;
    profile_id:number;
    menu_id?:number;
    createdAt?: Date;
    updatedAt?: Date;

}

export interface OrderInput extends Optional<OrderAttributes,'order_id'>{}
export interface OrderOutput extends Required<OrderAttributes> {}


export const ORDER_MODEL: ModelAttributes<Order> = {
    order_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      roomNo: {
        type: DataTypes.INTEGER,
      },
      tableNo: {
        type: DataTypes.INTEGER,
      },
      customerName: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.BIGINT,
      },
      orderDetails: {
        type: DataTypes.STRING
      },
      revenue: {
        type: DataTypes.BIGINT
      },
      status: {
        type: DataTypes.STRING
      },
      notes: {
        type: DataTypes.STRING
      },
      profile_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'profile', // name of Target model
          key: 'profile_id', // key in Target model that we're referencing
        },
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE',
      },
      menu_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'menu', // name of Target model
          key: 'menu_id', // key in Target model that we're referencing
        },
        onUpdate: 'NO ACTION',
        onDelete: 'CASCADE',
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
}
export default class Order extends Model<OrderAttributes,OrderInput> implements OrderAttributes{
    order_id!:number;
    roomNo!:number;
    tableNo!:number;
    customerName!:string;
    email!:string;
    phone!:number;
    orderDetails!:string;
    revenue!:number;
    status!:string;
    notes!:string;
    profile_id!:number;
    menu_id!:number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;



public static associations: {};

static initModel(sequelize: Sequelize) {
  Order.init(ORDER_MODEL,
    {
      tableName: 'order',
      sequelize, // passing the `sequelize` instance is required
    }
  );
}

static associate(_models: Model[]) {
    Order.hasOne(Profile,{
        foreignKey :'profile_id'
    })
    Order.hasOne(Menu,{
        foreignKey:"menu_id"
    })
 
    Order.belongsToMany(Items,{through :OrderItems, as: 'items',foreignKey:"item_id"} );
}
}