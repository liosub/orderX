import Items, { ItemInput, ItemOutput ,ItemState} from "../models/Items"
import dotenv from 'dotenv';
import Menu, { MenuInput, MenuOutput } from "../models/Menu";
dotenv.config();

function menuItemsFormatter(payload:any,images:any,menu_id:number):ItemInput[]{
    const itemsX:ItemInput[]=[];
    for(var i=0;i<payload.sections.length;i++){
        let section=JSON.parse(payload.sections[i]);
        section?.items.forEach((it:any)=>{
        const item:ItemInput={
            menu_id:menu_id,
            sectionTitle:section.title,
            sectionDescription:section.details,
            title:"",
            description:"",
            price:0,
            allergens:"",
            specialOffer:0.0,
            itemState:ItemState.AVAILABLE,
            image:""
        };
            item.title= it.title;
            item.description= it.description;
            item.price= it.price;
            item.image= images["images"][i].path;
            item.allergens= it.allergens;
            item.itemState=(it.itemState == 0)?ItemState.SOLD_OUT : ItemState.AVAILABLE;
            itemsX.push(item);
        });
    }
    return itemsX;
}

export const createManyItems = async (payload: any,images:any,menu_id:number): Promise<ItemOutput[]> => {
    const newItems= menuItemsFormatter(payload,images,menu_id);
    const item = await Items.bulkCreate(newItems as ItemInput[]);
    return item;
}

export const create = async (payload: any,profile_id:number): Promise<MenuOutput> => {
    const menu:MenuInput={
        menuTitle:"",
        menuDetails:"",
        accent:"",
        font:"",
        profile_id:0
    };
    menu.menuTitle=payload?.menu_title;
    menu.menuDetails= payload?.menu_details;
    menu.accent=payload?.accent;
    menu.font=payload?.font;
    menu.profile_id= profile_id;
    const [newMenu] = await Menu.findOrCreate({
        where: {
            menuTitle: menu.menuTitle
        },
        defaults: menu as MenuInput
    });

    
    return newMenu;
}

export const getById = async (id: number): Promise<MenuOutput> => {
    const menu = await Menu.findByPk(id)

    if (!menu) {
        //@todo throw custom error
        throw new Error('not found')
    }
    return menu
}

export const getByProfileId = async (id: number): Promise<MenuOutput> => {
    const menu = await Menu.findOne({
        where: {profile_id:id}
    })

    if (!menu) {
        //@todo throw custom error
        throw new Error('not found')
    }
    return menu
}

export const update = async (id: number, payload: Partial<Menu>): Promise<MenuOutput> => {
    const menu = await Menu.findByPk(id)

    if (!menu) {
        //@todo throw custom error
        throw new Error('not found')
    }

    return menu.update(payload)
}

export const deleteById = async (id: number): Promise<boolean> => {
    const numDeletedMenus= await Menu.destroy({
        where: {menu_id:id}
    })

    return !!numDeletedMenus
}
