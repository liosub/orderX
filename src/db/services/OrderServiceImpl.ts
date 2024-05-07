import { OrderInput, OrderOutput } from "../models/Order"
import * as orderService from './OrderService'

export const create = async (payload: any): Promise<OrderOutput> => {
    return orderService.create(payload);
}

export const update = async (id: number, payload: Partial<OrderInput>): Promise<OrderOutput> => {
    return  orderService.update(id, payload)
}

export const getById = async (id: number): Promise<OrderOutput> => {
    return  orderService.getById(id)
}

export const getAllOrdersByProfile = async (profile_id:number): Promise<OrderOutput[]> => {
    return  orderService.getAllOrdersByProfile(profile_id)
}

export const getAllCustomerOrders = async (profile_id:number): Promise<OrderOutput[]> => {
    return  orderService.getAllMenuOrders(profile_id)
}

export const getOrdersAnalyticsData = async (profile_id:number): Promise<any[]> => {
    return await orderService.getOrdersAnalyticsData(profile_id)
}

export const deleteById = async (id: number): Promise<boolean> => {
    return  orderService.deleteById(id)

}