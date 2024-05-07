import { Sequelize } from "sequelize";
import Items,{ ItemOutput } from "../models/Items";
import Order, { OrderInput, OrderOutput } from "../models/Order"
import { Menu, Profile } from "../models";

const orderStatus = ["Processing","Canceled","Done","Pending"];

function getRevenue(items:any,total_price:number):Number{
    let revenue=0;
    items.forEach((it:any) =>{
        revenue+=(it.price* it.counter)
    })
    return (revenue>total_price)? revenue:total_price;
}

export const create = async (payload: any): Promise<OrderOutput> => {
    const order:any={
        profile_id:payload.profileId,
        menu_id:payload.menuId,
        customerName:"",
        notes:payload.public_notes,
        revenue:getRevenue(payload.cart,payload.total_price),
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
export const getAllMenuOrders = async (profile_id:number): Promise<any[]> => {
    return  Order.findAll({
        attributes:["order_id","customerName","roomNo","tableNo","revenue","createdAt"],
        where:{
            profile_id:profile_id
        }
    });
}

export const getAllOrdersByProfile = async (profile_id:number): Promise<any[]> => {
    return  Order.findAll({
        attributes:[
            [Sequelize.fn("COUNT", Sequelize.col("*")), "orders"],
            [Sequelize.fn("SUM", Sequelize.col("revenue")), "revenue"],
        ],
        include: [
                {
                  model: Profile,
                  attributes:["businessName","url","email"]
                },
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