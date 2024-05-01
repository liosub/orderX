import { Sequelize } from "sequelize";
import Items,{ ItemOutput } from "../models/Items";
import Order, { OrderInput, OrderOutput } from "../models/Order"
import { Profile } from "../models";

const orderStatus = ["Processing","Canceled","Done","Pending"];

function getRevenue(items:any):Number{
    let revenue=0;
    items.forEach((it:any) =>{
        revenue+=it.price
    })
    return revenue;
}

export const create = async (payload: any): Promise<OrderOutput> => {
    const order:any={
        profile_id:payload.profile_id,
        menu_id:payload.menu_id,
        customerName:"",
        notes:payload.notes,
        revenue:getRevenue(payload),
        email:"",
        status:orderStatus[0]
    };
    const newOrder:OrderOutput = await Order.create(order as OrderInput);
    return newOrder;
}

export const getById = async (id: number): Promise<OrderOutput> => {
    const order = await Order.findByPk(id)

    if (!order) {
        //@todo throw custom error
        throw new Error('not found')
    }

    return order
}

export const update = async (id: number, payload: Partial<Order>): Promise<OrderOutput> => {
    const order = await Order.findByPk(id)

    if (!order) {
        throw new Error('not found')
    }

    return order.update(payload)
}

export const deleteById = async (id: number): Promise<boolean> => {
    const numDeleteditems=  Order.destroy({
        where: {order_id:id}
    })

    return !!numDeleteditems
}
export const getAllOrderTable = async (): Promise<any[]> => {
    return  Order.findAll({
        attributes:["order_id","customerName","roomNo","tableNo","revenue","createdAt"]
    });
}

export const getAll = async (): Promise<any[]> => {
    return  Order.findAll({
        attributes:["order_id","email","roomNo","tableNo","revenue","createdAt","status","notes","profile_id",
        // [Sequelize.fn("COUNT", Sequelize.col("*")), "orderCount"],
        // [Sequelize.fn("SUM", Sequelize.col("revenue")), "orderSum"],

    ],
        include: [
                {
                  model: Profile,
                },
                {
                    model: Items,
                    as: "items"
                },
              ],
         order: ['profile_id']
}
    );
}

export const getOrdersAnalyticsData = async (orderId:number): Promise<any[]> => {
    return Order.findAll({
            attributes: [
                [Sequelize.fn("COUNT", Sequelize.col("*")), "orderCount"],
                [Sequelize.fn("SUM", Sequelize.col("revenue")), "orderSum"],
                [Sequelize.fn("AVG", Sequelize.col("revenue")), "orderAvg"], 
             
            ],
            where:{
                order_id:orderId
            },
            // group: ['id']
  
    });
}