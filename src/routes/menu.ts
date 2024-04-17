import { Router, Request, Response } from 'express'
import * as menuServiceImpl from '../db/services/MenuServiceImpl'
import { MenuInput, MenuOutput } from '../db/models/Menu'
import verifyToken from '../middleware/authMiddleware'
import { uploadItmes } from '../middleware/upload'

const menuRouter = Router()


menuRouter.get('/', verifyToken,async (req: Request, res: Response) => {
    try{
        const result = await menuServiceImpl.getByProfileId(req.token._id);    
        return res.status(200).send(result);
    }
    catch(error){
        return res.status(400).json({error:error});    
    }
})

menuRouter.post('/createMany',verifyToken,uploadItmes,async (req: Request, res: Response) => {
    try{
        const images = req.files as {[fieldname :string] :Express.Multer.File[]};
        const payload =req.body;
        const savedMenu = await menuServiceImpl.create(payload,req.token._id);
        const result = await menuServiceImpl.createMany(payload,images,savedMenu.menu_id);
        return res.status(200).send(result);
    }
    catch(error){
        return res.status(400).json({error:error});    
    }
})

menuRouter.post('/createOne', verifyToken,async (req: Request, res: Response) => {
    try{
        const payload: MenuInput = req.body
        const result = await menuServiceImpl.create(payload,req.token._id);
        return res.status(200).send(result)    
    }
    catch(error){
        return res.status(400).json({error:error});    
    }
})

menuRouter.put('/:id', verifyToken,async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const payload: MenuInput = req.body

    const result = await menuServiceImpl.update(id, payload)

    return res.status(200).send(result)
})

menuRouter.delete('/:id', verifyToken,async (req: Request, res: Response) => {
    try{
    const id = Number(req.params.id)

    const result = await menuServiceImpl.deleteById(id)

    return res.status(200).send({
        success: result
    })
}
catch(error){
    return res.status(400).json({error:error});    
}
})


export default menuRouter;