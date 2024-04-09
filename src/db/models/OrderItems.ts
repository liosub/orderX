import { DataTypes, Model, Optional ,Sequelize,ModelAttributes} from 'sequelize'



interface OrderItemsAtrributes{
    id:number;
    order_id:number;
    item_id:number;
    quantity:number;
    price:bigint;
    createdAt?: Date;
    updatedAt?: Date;

}

export interface OrderItemsInput extends Optional<OrderItemsAtrributes,'id'>{}
export interface OrderItemsOutput extends Required<OrderItemsAtrributes> {}


export const ORDER_ITEM_MODEL: ModelAttributes<OrderItems> = {
    id: {
    type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    order_id: {
        type: DataTypes.INTEGER,
    },
    item_id: {
        type: DataTypes.INTEGER,
    },
    quantity: {
        type: DataTypes.INTEGER,
    },
    price: {
        type: DataTypes.BIGINT,
    }
}
export default class OrderItems extends Model<OrderItemsAtrributes,OrderItemsInput> implements OrderItemsAtrributes{
    id!:number;
    order_id!:number;
    item_id!:number;
    quantity!:number;
    price!:bigint;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;



public static associations: {};

static initModel(sequelize: Sequelize) {
    OrderItems.init(ORDER_ITEM_MODEL,
    {
      tableName: 'order_items',
      sequelize, // passing the `sequelize` instance is required
    }
  );
}

static associate(_models: Model[]) {}
}