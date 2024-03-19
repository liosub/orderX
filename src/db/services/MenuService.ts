import Menu, { MenuInput, MenuOutput } from "../models/Menu"



export const create = async (payload: MenuInput): Promise<MenuOutput> => {
    return await Menu.create(payload)
}

export const getById = async (id: number): Promise<MenuOutput> => {
    const menu = await Menu.findByPk(id)

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
