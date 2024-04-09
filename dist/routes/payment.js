"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stripe_1 = __importDefault(require("stripe"));
const dotenv_1 = __importDefault(require("dotenv"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
dotenv_1.default.config();
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_SECRET_KEY;
const stripe = new stripe_1.default(STRIPE_SECRET_KEY);
const paymentRouter = (0, express_1.Router)();
paymentRouter.post('/', authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, customerId } = req.body;
    // 1 cents to charge $1.00 or 100 
    try {
        const charge = yield stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            description: 'Charge for Order ...',
            customer: customerId,
            automatic_payment_methods: {
                enabled: true,
            },
        });
        res.send('Payment successful');
    }
    catch (err) {
        console.error('Error processing payment:', err);
        let message = 'An error occurred while processing your payment.';
        if (err.type === 'StripeCardError') {
            message = err.message;
        }
        res.status(500).send(message);
    }
}));
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
exports.default = paymentRouter;
