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
exports.createSessions = exports.createStripeCustomer = exports.createProducts = exports.stripe = void 0;
const express_1 = require("express");
const stripe_1 = __importDefault(require("stripe"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const REACT_APP_STLLR_URL = process.env.REACT_APP_STLLR_URL;
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_SECRET_KEY;
exports.stripe = new stripe_1.default(STRIPE_SECRET_KEY);
function createProducts(orderNo, total_price) {
    return __awaiter(this, void 0, void 0, function* () {
        const product = yield exports.stripe.products.create({
            name: orderNo.toString(),
        });
        const price = yield exports.stripe.prices.create({
            product: product.id,
            unit_amount: total_price,
            currency: 'usd',
            recurring: {
                interval: "day",
            },
        });
        return price;
    });
}
exports.createProducts = createProducts;
function createStripeCustomer(email, name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const customer = yield exports.stripe.customers.create({
                email: email,
                name: name,
            });
            return customer;
        }
        catch (err) {
            console.error(err);
            return null;
        }
    });
}
exports.createStripeCustomer = createStripeCustomer;
function itemsFormatter(items) {
    const line_items = [];
    items.forEach(it => {
        const itx = {
            price_data: {
                product_data: {
                    name: it.item_title,
                },
                currency: "usd",
                unit_amount: it.price * 100,
            },
            quantity: it.counter,
        };
        line_items.push(itx);
    });
    return line_items;
}
function createSessions(items) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const itemsSession = itemsFormatter(items);
            if (items.length <= 0) {
                return;
            }
            const session = yield exports.stripe.checkout.sessions.create({
                line_items: itemsSession,
                mode: "payment",
                success_url: `${REACT_APP_STLLR_URL}/success`,
                cancel_url: `${REACT_APP_STLLR_URL}/cancel`,
            });
            // console.log(session);
            return session.url;
        }
        catch (error) {
            return error;
        }
    });
}
exports.createSessions = createSessions;
const paymentRouter = (0, express_1.Router)();
paymentRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).send("result");
}));
paymentRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, customerId } = req.body;
    // 1 cents to charge $1.00 or 100 
    try {
        const charge = yield exports.stripe.paymentIntents.create({
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
// paymentRouter.post("/sessions", async(req: Request, res: Response) => {
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
exports.default = paymentRouter;
