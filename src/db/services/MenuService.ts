import Items, { ItemInput, ItemOutput ,ItemState} from "../models/Items"
import dotenv from 'dotenv';
import Menu, { MenuInput, MenuOutput } from "../models/Menu";
import Profile from "../models/Profile";
dotenv.config();

function menuItemsFormatter(payload:any,images:any,menu_id:number):ItemInput[]{
    const itemsX:ItemInput[]=[];

    for(var i=0;i<payload.sections.length;i++){
        let section=JSON.parse(payload.sections[i]);
        var j=0;
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
            image:"",
            additionalFields:""
        };
            if(it.item_id){
                item.item_id= it.item_id;
            }
            item.title= it.title;
            item.description= it.description;
            item.price= it.price as number || 0.0;
            item.additionalFields=JSON.stringify(it.additionalFields)
            item.image=(it.item_image!=null)? it.item_image: "none";
            item.allergens= it.allergens || "";
            item.itemState=(it.itemState == 0)?ItemState.SOLD_OUT : ItemState.AVAILABLE;
            itemsX.push(item);
        });
    }
    var i=0;
    for(var j=0;j<itemsX.length;j++){
        if(itemsX[j].image == "none"){
            itemsX[j].image=images["images"][i]?.path as string;   
            i++;
        }
    }
    return itemsX;
}

export const createOrUpdateManyItems = async (payload: any,images:any,menu_id:number): Promise<ItemOutput[]> => {
    const newItems= menuItemsFormatter(payload,images,menu_id);
    if(newItems.length> 0){
        const item = await Items.bulkCreate(newItems as ItemInput[], {updateOnDuplicate: ["item_id"]});
        return item;    
    }
    return [];

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
    if(payload?.menu_id > 0){
        const existMenu = await Menu.findByPk(payload.menu_id);
        const updatedMenu :any= await existMenu?.update(menu) || {}; 
        return updatedMenu
    }
    else{
       const newMenu = await Menu.create(menu);
       return newMenu;
    }
}

export const getById = async (id: number): Promise<MenuOutput> => {
    const menu = await Menu.findByPk(id)
    if (!menu) {
        throw new Error('not found')
    }
    return menu
}

export const getByProfileId = async (id: number): Promise<MenuOutput> => {
    const menu = await Menu.findOne({
        where: {profile_id:id},
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
