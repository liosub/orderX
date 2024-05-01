import { Router, Request, Response } from 'express'
import * as orderItemServiceImpl from '../db/services/OrderItemService'
import { OrderItemsInput, OrderItemsOutput } from '../db/models/OrderItems'

const orderItemRouter = Router()


orderItemRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const result = await orderItemServiceImpl.getById(id)
        return res.status(200).send(result)
    } catch (error) {
        res.status(400).json({ error: error });
    }
})

orderItemRouter.post('/', async (req: Request, res: Response) => {
    try {
        const payload: OrderItemsInput = req.body
        const result = await orderItemServiceImpl.create(payload)
        return res.status(200).send(result)
    } catch (error) {
        res.status(400).json({ error: error });
    }
})

// orderItemRouter.post('/many/', async (req: Request, res: Response) => {
//     try {
//         const payload: OrderItemsInput[] = req.body
//         const result = await orderItemServiceImpl.createMany(payload)
//         return res.status(200).send(result)
//     } catch (error) {
//         res.status(400).json({ error: error });
//     }
// })


export default orderItemRouter;