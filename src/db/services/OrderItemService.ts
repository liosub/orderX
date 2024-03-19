import OrderItems, { OrderItemsInput, OrderItemsOutput } from "../models/OrderItems";



export const create = async (payload: OrderItemsInput): Promise<OrderItemsOutput> => {
    const orderitems = await OrderItems.create(payload);
    return orderitems;
}



export const createMany = async (payload: OrderItemsInput[]): Promise<OrderItemsOutput[]> => {
    const orderitems = await OrderItems.bulkCreate(payload);
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
