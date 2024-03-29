import { DataTypes, Model, Optional ,Sequelize,ModelAttributes} from 'sequelize'
import Order from './Order';
import Menu from './Menu';
import OrderItems from './OrderItems';

export enum ItemState{
    SOLD_OUT,AVAILABLE
}
interface ItemAttributes{
    item_id:number;
    sectionTitle:string;
    sectionDescription:string;
    title?:string;
    description:string;
    image: string;
    price:number;
    allergens?:string;
    specialOffer?:number;
    itemState?:ItemState;
    menu_id?:number;
    createdAt?: Date;
    updatedAt?: Date;
}



export interface ItemInput extends Optional<ItemAttributes,'item_id'>{}
export interface ItemOutput extends Required<ItemAttributes> {}

export const ITEM_MODEL: ModelAttributes<Items> = {
    item_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        primaryKey: true
      },
      sectionTitle: {
        type: DataTypes.STRING,
      },
      sectionDescription: {
        type: DataTypes.STRING,
      },
      title: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.DOUBLE,
      },
      allergens: {
        type: DataTypes.STRING,
      },
      specialOffer: {
        type: DataTypes.DOUBLE,
      },
      itemState: {
        type: DataTypes.ENUM({
          values: ['SOLD_OUT','AVAILABLE']
        }),
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

export default class Items extends Model<ItemAttributes,ItemInput> implements ItemAttributes{
    public item_id!:number;
    public sectionTitle!:string;
    public sectionDescription!:string;
    public title!:string;
    public description!:string;
    public image!: string;
    public price!:number;
    public allergens!:string;
    public itemState!:ItemState;
    public specialOffer!:number;
    public menu_id!:number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;



public static associations: {};

static initModel(sequelize: Sequelize) {
  Items.init(ITEM_MODEL,
    {
      tableName: 'items',
      sequelize, // passing the `sequelize` instance is required
    }
  );
}

static associate(_models: Model[]) {
    Items.belongsToMany(Order, { through: OrderItems,as :'order',foreignKey:"order_id"} );

    Menu.hasMany(Items,{
        foreignKey :'menu_id'
    });
}
}