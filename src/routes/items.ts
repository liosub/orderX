import { Router, Request, Response } from 'express'
import * as itemsServiceImpl from '../db/services/ItemsServiceImpl'
import { ItemInput } from '../db/models/Items'
import  { uploadItmes } from '../middleware/upload';
import verifyToken from '../middleware/authMiddleware';
import * as menuServiceImpl from '../db/services/MenuServiceImpl'

const itemsRouter = Router()

itemsRouter.get('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    
    const result = await itemsServiceImpl.getById(id)
    
    return res.status(200).send(result)
})


itemsRouter.post('/guest/:id',async (req: Request, res: Response) => {
    try{
        const menuId = Number(req.params.id)
        const result = await itemsServiceImpl.getAllItemsByMenuId(menuId);    
        return res.status(200).send(result);
    }
    catch(error){
        return res.status(400).json({error:error});    
    }
})

itemsRouter.get('/', verifyToken,async (req: Request, res: Response) => {
    try{
        const menu = await menuServiceImpl.getByProfileId(req.token._id);
        if(!menu){
            res.status(400).json({ error: "menu not found" });

        }
        const result = await itemsServiceImpl.getAllByMenuId(menu.menu_id);
        return res.status(200).send(result)
    }
    catch(error){
        res.status(400).json({ error: error });
    }
})
itemsRouter.get('/menu/:menu_id', verifyToken,async (req: Request, res: Response) => {
    const id = Number(req.params.menu_id)
    const result = await itemsServiceImpl.getAllByMenuId(id)
    return res.status(200).send(result)
})

itemsRouter.post('/',verifyToken,uploadItmes,async (req: Request, res: Response) => {
    const payload =req.body;
    payload.images = req?.file?.filename || "n/a";
    const result = await itemsServiceImpl.create(payload);
    return res.status(200).send(result)
})



itemsRouter.post('/section/:id',verifyToken,uploadItmes, async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const payload: ItemInput = req.body
    const files = req.files as {[fieldname :string] :Express.Multer.File[]};
    payload.image = files["image"][0].filename;
    const result = await itemsServiceImpl.update(id, payload)

    return res.status(200).send(result)
})

itemsRouter.put('/:id',verifyToken,uploadItmes, async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const payload: ItemInput = req.body

    const result = await itemsServiceImpl.update(id, payload)

    return res.status(200).send(result)
})

itemsRouter.post('/itemX/:id', async (req: Request, res: Response) => {
    try{
        const menu_id = Number(req.params.id)
        const itemsId= req.body
        const result = await itemsServiceImpl.deleteById(menu_id,itemsId)
        return res.status(200).send({
            success: "Success"
        })
    }
    catch(error){
        return res.status(400).send({
            success:"Failed",error
        })
    }

})
export default itemsRouter;
