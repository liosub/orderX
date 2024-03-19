interface ListFilters {
    isDeleted?: boolean
    includeDeleted?: boolean
    profile_id?:number
    menu_id?:number
}

export interface GetAllProfilesFilters extends ListFilters {}
export interface GetAllMenusFilters extends ListFilters {}
export interface GetAllItemsFilters extends ListFilters {}
