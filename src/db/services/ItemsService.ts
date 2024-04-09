import Items, { ItemInput, ItemOutput } from "../models/Items"
import dotenv from 'dotenv';
import * as MenuService from './MenuServiceImpl'
import Menu, { MenuInput } from "../models/Menu";
dotenv.config();

export const create = async (payload: ItemInput): Promise<ItemOutput> => {
    const item = await Items.create(payload);
    return item;
}

export const getById = async (id: number): Promise<ItemOutput> => {
    const item = await Items.findByPk(id)

    if (!item) {
        //@todo throw custom error
        throw new Error('not found')
    }

    return item
}

export const update = async (id: number, payload: Partial<Items>): Promise<ItemOutput> => {
    const item = await Items.findByPk(id)

    if (!item) {
        //@todo throw custom error
        throw new Error('not found')
    }

    return item.update(payload)
}

export const deleteById = async (id: number): Promise<boolean> => {
    const numDeleteditems=  Items.destroy({
        where: {item_id:id}
    })

    return !!numDeleteditems
}

export const getAll = async (menu_id:number): Promise<ItemOutput[]> => {
    return  Items.findAll({
        where: {
            menu_id:menu_id
        }
    })
}

export const getBySection = async (section:string): Promise<ItemOutput[]> => {
    return  Items.findAll({
        where: {
            sectionTitle:section
        },
    })
}
