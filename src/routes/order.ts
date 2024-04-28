import { Router, Request, Response } from 'express'
import * as orderServiceImpl from '../db/services/OrderServiceImpl'
import { OrderInput } from '../db/models/Order'
import verifyToken from '../middleware/authMiddleware'

const orderRouter = Router()


// orderRouter.get('/:id', async (req: Request, res: Response) => {
//     const id = Number(req.params.id)
    
//     const result = await orderServiceImpl.getById(id)
    
//     return res.status(200).send(result)
// })
// orderRouter.get('/', verifyToken,async (req: Request, res: Response) => {    
//     const result = await orderServiceImpl.getAll()
//     // getAllOrderTable()
//     return res.status(200).send(result)
// })
/**/

orderRouter.get("/opt", verifyToken,async (req: Request, res: Response) => {    
    try{
        const id = Number(req.token._id)
        const result = await orderServiceImpl.getOrdersAnalyticsData(id)
        return res.status(200).send(result)
    }
    catch(error){
        res.status(400).json({ error: error });
    }
})
orderRouter.post('/', verifyToken,async (req: Request, res: Response) => {
    try{
        const payload = req.body;
        const result = await orderServiceImpl.create(payload)
        return res.status(200).send(result)    
    }
    catch(error){
        res.status(400).json({ error: error });
    }
})

orderRouter.put('/:id', verifyToken,async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const payload: OrderInput = req.body

    const result = await orderServiceImpl.update(id, payload)

    return res.status(200).send(result)
})

orderRouter.delete('/:id', verifyToken,async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    const result = await orderServiceImpl.deleteById(id)

    return res.status(200).send({
        success: result
    })
})


export default orderRouter;