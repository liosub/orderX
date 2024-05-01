import { Router, Request, Response} from 'express'
import dotenv from 'dotenv';
import * as profileServiceImpl from '../db/services/ProfileServiceImpl'
import { ProfileInput } from '../db/models/Profile'
import generateTokens from '../middleware/userToken';
import verifyToken from '../middleware/authMiddleware';
import {upload, uploadLogo} from '../middleware/upload';
dotenv.config();
const IMG_URI = process.env.UPLOADS_IMG_URI;
const QR_URI= process.env.QRCODE_URI;
const profileRouter = Router()


profileRouter.get('/me', verifyToken,async (req: Request, res: Response) => {
    const id = Number(req.token._id)
    const result = await profileServiceImpl.getById(id)
    return res.status(200).send(result)
})

profileRouter.get('/:id', verifyToken,async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const result = await profileServiceImpl.getById(id)
    return res.status(200).send(result)
})

profileRouter.post('/guest/:id',async (req: Request, res: Response) => {
    try{
    const id = Number(req.params.id)
    const result = await profileServiceImpl.getByIdGuest(id)
    return res.status(200).send(result);
    } 
   catch(error){
    res.status(400).json({ error: error });
}
})


profileRouter.post('/createM',verifyToken,upload, async (req: Request, res: Response) => {
    const payload:ProfileInput = req.body
    const files = req.files as {[fieldname :string] :Express.Multer.File[]};
    try{
        payload.logo = `${IMG_URI}/${files["logo"][0].filename}`;
        payload.QRCode= `${QR_URI}/${payload.businessName}-QR.png`;
        const result = await profileServiceImpl.createNewProfile(req.token._id,payload)
            res.status(201).json({
            result,
            token: await generateTokens(result),
            });
    }
    catch(error){
        res.status(400).json({ error: error });
    }
})

profileRouter.post('/create',verifyToken,uploadLogo, async (req: Request, res: Response) => {
    const payload:ProfileInput = req.body;
    const files = req.files as {[fieldname :string] :Express.Multer.File[]};
    try{
        payload.logo = `${files["logo"][0].path}`;
        payload.QRCode= `${payload.businessName}-QR.png`;
        const result = await profileServiceImpl.createNewProfile(req.token._id,payload)
            res.status(201).json({
            result,
            token: await generateTokens(result),
            });
    }
    catch(error){
        res.status(400).json({ error: error });
    }
})

profileRouter.put('/:id', verifyToken,async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const payload:ProfileInput = req.body
    
    const result = await profileServiceImpl.update(id, payload)
    return res.status(201).send(result)
})

profileRouter.delete('/:id',verifyToken, async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    
    const result = await profileServiceImpl.deleteById(id)
    return res.status(204).send({
        success: result
    })
})

export default profileRouter;