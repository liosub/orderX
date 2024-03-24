import { ProfileInput,ProfileOutput } from "../models/Profile"
import * as profileService from './ProfileService'


export const getById = (id: number): Promise<ProfileOutput> => {
    return profileService.getById(id)
}

export const getByEmail = (email: string): Promise<ProfileOutput> => {
    return profileService.getByEmail(email)
}

export const create = async (payload: ProfileInput): Promise<ProfileOutput> => {
    return profileService.create(payload)
}

export const findOrCreate = async (payload: ProfileInput): Promise<ProfileOutput> => {
    return profileService.findOrCreate(payload)
}

export const createNewProfile = async (id: number, payload: Partial<ProfileInput>): Promise<ProfileOutput> => {
    return profileService.createNewProfile(id, payload)
}

export const update = async (id: number, payload: Partial<ProfileInput>): Promise<ProfileOutput> => {
    return profileService.update(id, payload)
}

export const deleteById = (id: number): Promise<boolean> => {
    return profileService.deleteById(id)
}