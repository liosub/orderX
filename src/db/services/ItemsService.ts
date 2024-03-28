import Items, { ItemInput, ItemOutput } from "../models/Items"
import dotenv from 'dotenv';
import * as MenuService from './MenuServiceImpl'
import Menu, { MenuInput } from "../models/Menu";
dotenv.config();
const IMG_URI = process.env.UPLOADS_IMG_URI;

function menuItemsFormatter(payload:any,menu_id:number):ItemInput[]{
    const items:ItemInput[]=Array();
    payload.array.forEach((element:{sectionTitle:string,sectionDescription:string,itemsX:ItemInput[]}) => {
        const item:ItemInput=new Items();
        item.menu_id=menu_id
        item.sectionTitle=element.sectionTitle;
        item.sectionDescription=element.sectionDescription;
        element.itemsX.forEach(it=>{
            item.title= it.title;
            item.description= it.description;
            item.price= it.price;
            item.image= `${IMG_URI}/${it.image}`;
            item.allergens= it.allergens;
            item.itemState=0;
        });
        items.push(item);
    });
    return items;
}
export const create = async (payload: ItemInput): Promise<ItemOutput> => {
    const item = await Items.create(payload);
    return item;
}
export const createManyItems = async (payload: any,profile_id:number): Promise<ItemOutput[]> => {
    const menu:MenuInput= new Menu();
    menu.accent=payload.accent;
    menu.font=payload.font;
    menu.profile_id= profile_id;
    const newMenu = await MenuService.create(menu);
    const newItems= menuItemsFormatter(payload,newMenu.menu_id);
    const item = await Items.bulkCreate(newItems);
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
        },
    })
}

export const getBySection = async (section:string): Promise<ItemOutput[]> => {
    return  Items.findAll({
        where: {
            sectionTitle:section
        },
    })
}
