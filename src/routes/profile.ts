import { Router, Request, Response} from 'express'
import * as profileServiceImpl from '../db/services/ProfileServiceImpl'
import { ProfileInput } from '../db/models/Profile'
import bcrypt from 'bcrypt';

import generateTokens from '../middleware/userToken';
import verifyToken from '../middleware/authMiddleware';
import upload from '../middleware/upload';
import { forEachChild } from 'typescript';


const profileRouter = Router()

profileRouter.get('/:id', verifyToken,async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const result = await profileServiceImpl.getById(id)
    return res.status(200).send(result)
})

profileRouter.post('/signup', async (req: Request, res: Response) => {
    const payload:ProfileInput = req.body
    const result = await profileServiceImpl.create(payload)
    if (result) {
        res.status(201).json({
        result,
        token: await generateTokens(result),
        });
      } else {
        res.status(400);
        throw new Error("Invalid user data");
      }
})

profileRouter.post('/create',verifyToken,upload, async (req: Request, res: Response) => {
    const payload:ProfileInput = req.body
    const files = req.files as {[fieldname :string] :Express.Multer.File[]};
    payload.logo = files["logo"][0].filename;
    payload.bannerImage = files["bannerImage"][0].filename
    payload.QRCode =files["QRCode"][0].filename

    const result = await profileServiceImpl.update(req.token._id,payload)
    if (result) {
        res.status(201).json({
        result,
        token: await generateTokens(result),
        });
      } else {
        res.status(400);
        throw new Error("Invalid user data");
      }
})

profileRouter.post('/signin', async (req: Request, res: Response) => {
    const payload:ProfileInput = req.body
    const result = await profileServiceImpl.getByEmail(payload.email)
    const passwordMatch =(await bcrypt.compare(payload.password, result.password));
    if (result && passwordMatch) {
        res.json({
          businessName: result.businessName,
          email: result.email,
          token: await generateTokens(result),
        });
      } else {
        res.status(400);
        throw new Error("Invalid credentials");
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