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
export const getAllMenuOrders = async (): Promise<any[]> => {
    return  Order.findAll({
        attributes:["order_id","customerName","roomNo","tableNo","revenue","createdAt"]
    });
}

export const getAllOrders = async (profile_id:number): Promise<any[]> => {
    return  Order.findAll({
        attributes:["customerName","roomNo","tableNo","order_id","revenue","createdAt","notes","status","profile_id"],
        include: [
                {
                  model: Profile,
                }
              ],
         order: ['profile_id'],
         where:{
            profile_id:profile_id
         }
}
    );
}

export const getOrdersAnalyticsData = async (profile_id:number): Promise<any[]> => {
    return await Order.findAll({
            attributes: [
                [Sequelize.fn("COUNT", Sequelize.col("*")), "orderCount"],
                [Sequelize.fn("SUM", Sequelize.col("revenue")), "orderSum"],
                [Sequelize.fn("AVG", Sequelize.col("revenue")), "orderAvg"], 
             
            ],
            where:{
                profile_id:profile_id
            },
  
    });
}