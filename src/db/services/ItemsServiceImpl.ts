import { profile } from "console";
import { ItemInput, ItemOutput } from "../models/Items"
import * as itemsService from './ItemsService'

export const create = async (payload: ItemInput): Promise<ItemOutput> => {
    return itemsService.create(payload);
}

export const update = async (id: number, payload: Partial<ItemInput>): Promise<ItemOutput> => {
    return  itemsService.update(id, payload)
}

export const getById = async (id: number): Promise<ItemOutput> => {
    return  itemsService.getById(id)
}

export const getBySection = async (section: string): Promise<ItemOutput[]> => {
    return  itemsService.getBySection(section)
}

export const getAllByMenuId = async (menu_id: number): Promise<ItemOutput[]> => {
    return  itemsService.getAll(menu_id)
}

export const getAllItemsByMenuId = async (menu_id: number): Promise<any[]> => {
    return await itemsService.getAllForGuest(menu_id)
}

export const deleteById = async (id: number,itemsIds:number[]): Promise<void> => {
    return await itemsService.deleteById(id,itemsIds);

}