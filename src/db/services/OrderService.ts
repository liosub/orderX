import { Sequelize } from "sequelize";
import Items,{ ItemOutput } from "../models/Items";
import Order, { OrderInput, OrderOutput } from "../models/Order"
import { Menu, Profile } from "../models";

// function orderFormatter(payload:any,images:any,menu_id:number):ItemInput[]{
//     const itemsX:ItemInput[]=[];

//     for(var i=0;i<payload.sections.length;i++){
//         let section=JSON.parse(payload.sections[i]);
//         var j=0;
//         section?.items.forEach((it:any)=>{
//         const item:ItemInput={
//             menu_id:menu_id,
//             sectionTitle:section.title,
//             sectionDescription:section.details,
//             title:"",
//             description:"",
//             price:0,
//             allergens:"",
//             specialOffer:0.0,
//             itemState:ItemState.AVAILABLE,
//             image:"",
//             additionalFields:""
//         };
  
//         });
//     }
//     var i=0;
//     return itemsX;
// }

export const create = async (payload: OrderInput): Promise<OrderOutput> => {
    // notes: '', item_id: item.item_id, counter: 1, price: Number(item.price)
    const order = await Order.create(payload);
    return order;
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