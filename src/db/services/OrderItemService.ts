import OrderItems, { OrderItemsInput, OrderItemsOutput } from "../models/OrderItems";

function orderFormatter(items:any,order_id:number):OrderItemsInput[]{
    const orderItems :OrderItemsInput[]=[]
    for(var i=0;i<items.length;i++){
        const orderItem:OrderItemsInput={
            order_id:order_id,
            item_id:items[i].item_id,
            quantity:items[i].counter,
            price:items[i].price,
            notes:items[i].notes
        };
        orderItems.push(orderItem);
  }
  return orderItems;
}



export const create = async (payload: OrderItemsInput): Promise<OrderItemsOutput> => {
    const orderitems = await OrderItems.create(payload);
    return orderitems;
}



export const createMany = async (payload: OrderItemsInput[],order_id:number): Promise<OrderItemsOutput[]> => {
    const newOrderItems = orderFormatter(payload,order_id);
    const orderitems = await OrderItems.bulkCreate(newOrderItems);
    return orderitems;
}

export const getById = async (id: number): Promise<OrderItemsOutput> => {
    const orderitems = await OrderItems.findByPk(id)

    if (!orderitems) {
        //@todo throw custom error
        throw new Error('not found')
    }

    return orderitems
}
