import { ItemOutput } from "../models/Items";
import { OrderInput, OrderOutput } from "../models/Order"
import * as orderService from './OrderService'

export const create = async (payload: OrderInput): Promise<OrderOutput> => {
    return orderService.create(payload);
}

export const update = async (id: number, payload: Partial<OrderInput>): Promise<OrderOutput> => {
    return  orderService.update(id, payload)
}

export const getById = async (id: number): Promise<OrderOutput> => {
    return  orderService.getById(id)
}

export const getAll = async (): Promise<OrderOutput[]> => {
    return  orderService.getAll()
}

export const getAllOrderTable = async (): Promise<OrderOutput[]> => {
    return  orderService.getAllOrderTable()
}

export const getAllIncludeGroupBy = async (): Promise<any[]> => {
    return await orderService.getAllOrderGroupBy()
}

export const deleteById = async (id: number): Promise<boolean> => {
    return  orderService.deleteById(id)

}