import { Router, Request, Response } from 'express'
import * as orderServiceImpl from '../db/services/OrderServiceImpl'
import { OrderInput } from '../db/models/Order'
import verifyToken from '../middleware/authMiddleware'
import * as orderItemServiceImpl from '../db/services/OrderItemService'
import { OrderItemsInput } from '../db/models/OrderItems'
import { createProducts, createSessions, createStripeCustomer } from './payment'

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
/**/    // const priceId =await createProducts(result.order_id,payload.total_price);
        // const customerId =await createStripeCustomer("lol@mail.com","lol");
    


orderRouter.post("/analysis/total", verifyToken,async (req: Request, res: Response) => {    
    try{
        const id = Number(req.token._id)
        const result = await orderServiceImpl.getOrdersAnalyticsData(id)
        return res.status(200).send(result)
    }
    catch(error){
        res.status(400).json({ error: error });
    }
})


orderRouter.post("/analysis/customerInfo", verifyToken,async (req: Request, res: Response) => {    
    try{
        const id = Number(req.token._id)
        const result = await orderServiceImpl.getAllCustomerOrders(id)
        return res.status(200).send(result)
    }
    catch(error){
        res.status(400).json({ error: error });
    }
})

orderRouter.post("/analysis/profileInfo", verifyToken,async (req: Request, res: Response) => {    
    try{
        const id = Number(req.token._id)
        const result = await orderServiceImpl.getAllOrdersByProfile(id)
        return res.status(200).send(result)
    }
    catch(error){
        res.status(400).json({ error: error });
    }
})
orderRouter.post('/',async (req: Request, res: Response) => {
    try{
        const payload:any= req.body;
        const session:any= await createSessions(payload.cart,payload.profileId,payload.profilemail);
        if(session.id && session.url){
            payload.orderDetails=session.id;
            const result = await orderServiceImpl.create(payload);
            const oderItems = await orderItemServiceImpl.createMany(payload.cart,result.order_id);   
            return res.status(200).send(session.url);    
        }
        res.status(400).json({ error: "failed process" });
    }
    catch(error){
        console.log(error);
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