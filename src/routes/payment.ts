import { Router, Request, Response } from 'express'
import Stripe from 'stripe';
import dotenv from 'dotenv';
import verifyToken from '../middleware/authMiddleware';
import bodyParser from 'body-parser';
dotenv.config();

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY as string;
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_SECRET_KEY as string;
const stripe = new Stripe(STRIPE_SECRET_KEY);

const paymentRouter = Router()

paymentRouter.post('/',verifyToken,async (req: Request, res: Response) => {
    const { amount, customerId } = req.body;  
// 1 cents to charge $1.00 or 100 
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

// paymentRouter.post('/webhook', async (req: Request, res: Response) => {
//     const sig:any = req.headers['stripe-signature'];
//     let event;
  
//     try {
//       event = stripe.webhooks.constructEvent(req.body, sig, STRIPE_WEBHOOK_SECRET);
//     } catch (err:any) {
//       console.error('Error processing webhook:', err);
//       res.status(400).send(`Webhook Error: ${err.message}`);
//       return;
//     }
  
//     switch (event.type) {
//       case 'payment_intent.succeeded':
//         const paymentIntent = event.data.object;
//         break;
//       case 'payment_intent.payment_failed':
//         const paymentFailedIntent = event.data.object;
//         break;
//       default:
//         console.log(`Unhandled event type ${event.type}`);
//     }
  
//     res.status(200).end();
//   });
export default paymentRouter