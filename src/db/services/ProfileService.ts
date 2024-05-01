import { ProfileInput,ProfileOutput } from "../models/Profile"
import Profile from '../models/Profile'
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { base64_encode, createQR } from '../../middleware/qrGenerator';

dotenv.config();
const URI = process.env.URI;
const QR_URI= process.env.QRCODE_URI;
const REACT_APP_STLLR_URL = process.env.REACT_APP_STLLR_URL;
export const create = async (payload: ProfileInput): Promise<ProfileOutput> => {
    const encryptedUserPassword = await bcrypt.hash(payload.password, 10);
    payload.password =encryptedUserPassword;
    const profile = await Profile.create(payload);
    return profile
}

export const findOrCreate = async (payload: ProfileInput): Promise<ProfileOutput> => {
    const encryptedUserPassword = await bcrypt.hash(payload.password, 10);
    payload.password =encryptedUserPassword;
    const [profile] = await Profile.findOrCreate({
        where: {
            email: payload.email
        },
        defaults: payload
    })

    return profile
}

export const getByEmail = async (email: string): Promise<ProfileOutput> => {
    const profile = await Profile.findOne({
        where: {
            email: email
        },
    });
    if(!profile){
        throw new Error('not found')
    }
    return profile
}
export const getById = async (id: number): Promise<ProfileOutput> => {
    const profile = await Profile.findByPk(id)

    if (!profile) {
        // @todo throw custom error
        throw new Error('not found')
    }

    return profile
}

export const getByIdGuest = async (profile_id: number): Promise<any> => {
    try{
        
    const profile=await Profile.findOne({
        where:{
            profile_id:profile_id
        },
        attributes:["businessName","logo"]
    });

    return profile;
    }
    catch(error){
        console.log(error);
    }

}

export const update = async (id: number, payload: Partial<ProfileInput>): Promise<ProfileOutput> => {
    const profile = await Profile.findByPk(id)

    if (!profile) {
        // @todo throw custom error
        throw new Error('not found')
    }

    const updateProfile = await profile.update(payload)
    return updateProfile
}


export const createNewProfile = async (id: number, payload: Partial<ProfileInput>): Promise<ProfileOutput> => {
    const profile = await Profile.findByPk(id);
    if (!profile) {
        throw new Error('not found')
    }
    payload.profile_id=profile.profile_id;
    await qrCodeGenerator(payload);
    payload.url = `${URI}/profile/${profile.profile_id}`;
    payload.QRCode = `${QR_URI}/${payload.QRCode}`;
    const updateProfile = await profile.update(payload);
    return updateProfile
}

export const qrCodeGenerator = async ( payload: Partial<ProfileOutput>): Promise<void> => {
    const qrCodeName= payload.QRCode || payload.businessName+"QR";
    const url = `${REACT_APP_STLLR_URL}/menu/${payload.profile_id}`;
    var base64str = base64_encode(payload.logo);
    if(payload.logo){
        await createQR(qrCodeName,url,base64str ,150,50);
    }
    else{
        throw new Error('missing parameters')
    }
}

export const deleteById = async (id: number): Promise<boolean> => {
    const deletedProfileCount = await Profile.destroy({
        where: {profile_id:id}
    })

    return !!deletedProfileCount
}