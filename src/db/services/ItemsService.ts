import Items, { ItemInput, ItemOutput } from "../models/Items"
import dotenv from 'dotenv';
import * as MenuService from './MenuServiceImpl'
import Menu, { MenuInput } from "../models/Menu";
import { Profile } from "../models";
import { Op, Sequelize } from "sequelize";
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

export const deleteById = async (menu_id: number,itemsIds:number[]): Promise<void> => {
    itemsIds.map(async(item) =>{
        await Items.destroy({
            where: {
                menu_id:menu_id,
                item_id:item
            }
        })
    })
    return
}

export const getAll = async (menu_id:number): Promise<ItemOutput[]> => {
    return  Items.findAll({
        where: {
            menu_id:menu_id
        }
    })
}

export const getAllForGuest = async (menu_id:number): Promise<ItemOutput[]> => {
    try{
    return  Items.findAll({
        attributes:["sectionTitle","sectionDescription","item_id","title","description","image","price","itemState","additionalFields","allergens"],
        where: {
            menu_id:menu_id
        },
        include:[
            {
                model: Menu,
                attributes:["menuTitle","menuDetails","profile_id"],
                include:[
                    {
                        model:Profile,
                        attributes:["businessName","url"],
                    }
                ]
            },
      
        ],
        
   })
}
   catch(error){
    console.log(error);
    return [];
   }
}


export const getBySection = async (section:string): Promise<ItemOutput[]> => {
    return  Items.findAll({
        where: {
            sectionTitle:section
        },
    })
}
