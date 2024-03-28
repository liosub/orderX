import { Router, Request, Response } from 'express'
import * as menuServiceImpl from '../db/services/MenuServiceImpl'
import { MenuInput } from '../db/models/Menu'
import verifyToken from '../middleware/authMiddleware'

const menuRouter = Router()


menuRouter.get('/:id', verifyToken,async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    
    const result = await menuServiceImpl.getById(id)
    
    return res.status(200).send(result)
})

menuRouter.post('/', verifyToken,async (req: Request, res: Response) => {
    try{
        const payload: MenuInput = req.body
        const result = await menuServiceImpl.create(payload)
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
    const id = Number(req.params.id)

    const result = await menuServiceImpl.deleteById(id)

    return res.status(200).send({
        success: result
    })
})


export default menuRouter;