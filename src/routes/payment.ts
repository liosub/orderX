import { Router, Request, Response } from 'express'
import Stripe from 'stripe';
import dotenv from 'dotenv';
import * as orderServiceImpl from '../db/services/OrderServiceImpl'

import verifyToken from '../middleware/authMiddleware';
dotenv.config();
const REACT_APP_STLLR_URL=process.env.REACT_APP_STLLR_URL as string;
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY as string;
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_SECRET_KEY as string;
let paymentIds : Map<string, string> = new Map<string, string>();

export const stripe = new Stripe(STRIPE_SECRET_KEY);

export async function createProducts(orderNo:number,total_price:number){
  const product = await stripe.products.create({
    name: orderNo.toString(),
  });
  const price = await stripe.prices.create
  ({
    product: product.id,
    unit_amount: total_price,
    currency: 'usd',
    recurring: { 
      interval: "day",
    },
  });
  return price;
}


export async function createStripeCustomer(email:string, name:string) {
  try {
    const customer = await stripe.customers.create({
      email: email,
      name: name,
    });
    return customer;
  } catch (err) {
    console.error(err);
    return null;
  }
}

function itemsFormatter(items:any[]){
  const line_items:any=[];
  items.forEach(it=>{
    const itx=    {
      price_data: {
        product_data: {
          name: it.item_title,
        },
        currency: "usd",
        unit_amount: it.price*100,
      },
      quantity: it.counter,
    };
    line_items.push(itx);
  });
  return line_items;
}
export async function createSessions(items:any[],profileMail:string) {
  try {
    const itemsSession=itemsFormatter(items);
    if(items.length <=0){
      return;
    } 
    const session = await stripe.checkout.sessions.create({
      line_items:itemsSession,
      mode: "payment",
      customer_email:profileMail,
      success_url: `${REACT_APP_STLLR_URL}/success`,
      cancel_url: `${REACT_APP_STLLR_URL}/cancel`,
    });
    return session;
  } catch (error) {
    return error;
  }
}

const paymentRouter = Router();

paymentRouter.get('/',async (req: Request, res: Response) => {    
    return res.status(200).send("result")
})
paymentRouter.post('/',async (req: Request, res: Response) => {
    const { amount, customerId } = req.body;  
    try {
      const charge = await stripe.paymentIntents.create({
        amount:amount,
        currency: 'usd',
        description: 'Charge for Order ...',
        customer:customerId,
        automatic_payment_methods: {
            enabled: true,
          },
      });
      res.send('Payment successful');
    } catch (err:any) {
        console.error('Error processing payment:', err);
        let message = 'An error occurred while processing your payment.';
    
        if (err.type === 'StripeCardError') {
          message = err.message;
        }
    
        res.status(500).send(message);
    }
});


paymentRouter.post("/webhooks", async (req: Request, res: Response) => {
  try {
    const event = req.body;
    console.log(event);
    switch (event.type) {
      case 'charge.succeeded':
        const paymentIntent = event.data.object;
        console.log(paymentIntent?.receipt_url,paymentIntent?.billing_details?.email,'xxxx')
        break;
      case 'checkout.session.completed':
        const completedPayment = event.data.object;
        // const oder = await orderServiceImpl.getByOrderDetails(completedPayment.id);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
      res.status(201).send({ event });

  } catch (error) {
    res.status(500).json({ error });
  }
});
export default paymentRouter;




  // }// paymentRouter.post("/sessions", async(req: Request, res: Response) => {
  // try {
  //   const { stripeCustomerId, priceId } = req.body;
  //   const sessions = await stripe.checkout.sessions.create(
  //     {
  //       mode: "subscription",
  //       payment_method_types: ["card"],
  //       line_items: [
  //         {
  //           price: priceId,
  //           quantity: 1,
  //         },
  //       ],
  //       success_url: "<http://localhost:3000/subscription/success>",
  //       cancel_url: "<http://localhost:3000/subscription/failed>",
  //       customer: stripeCustomerId,
  //     },
  //     {
  //       apiKey: STRIPE_SECRET_KEY,
  //     }
  //   );
  //   res.status(201).send({ sessions });
  // } catch (error) {
  //   res.status(500).json({ error });
  // }
//  
// });
// [
//   {
//     price_data: {
//       product_data: {
//         name: "Laptop",
//       },
//       currency: "usd",
//       unit_amount: 2000,
//     },
//     quantity: 1,
//   },
//   {
//     price_data: {
//       product_data: {
//         name: "TV",
//       },
//       currency: "usd",
//       unit_amount: 1000,
//     },
//     quantity: 2,
//   },
// ],


