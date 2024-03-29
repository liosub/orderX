import { ItemOutput } from "../models/Items"
import  { MenuInput, MenuOutput } from "../models/Menu"
import * as menuService from './MenuService'

export const create = async (payload: MenuInput,profile_id:number): Promise<MenuOutput> => {
    return await menuService.create(payload,profile_id)
}
export const createMany = async (payload: any,images:any,menu_id:number): Promise<ItemOutput[]> => {
    return menuService.createManyItems(payload,images,menu_id);
}

export const update = async (id: number, payload: Partial<MenuInput>): Promise<MenuOutput> => {
    return await menuService.update(id, payload)
}

export const getById = async (id: number): Promise<MenuOutput> => {
    return await menuService.getById(id)
}
export const getByProfileId = async (profile_id: number): Promise<MenuOutput> => {
    return await menuService.getByProfileId(profile_id)
}
export const deleteById = async (id: number): Promise<boolean> => {
    return await menuService.deleteById(id)

}