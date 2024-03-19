import  { MenuInput, MenuOutput } from "../models/Menu"
import * as menuService from './MenuService'

export const create = async (payload: MenuInput): Promise<MenuOutput> => {
    return await menuService.create(payload)
}

export const update = async (id: number, payload: Partial<MenuInput>): Promise<MenuOutput> => {
    return await menuService.update(id, payload)
}

export const getById = async (id: number): Promise<MenuOutput> => {
    return await menuService.getById(id)
}

export const deleteById = async (id: number): Promise<boolean> => {
    return await menuService.deleteById(id)

}