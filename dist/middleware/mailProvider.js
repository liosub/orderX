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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const formData = require('form-data');
const nodemailer = require('nodemailer');
function sendMail(recepient, text) {
    return __awaiter(this, void 0, void 0, function* () {
        const transporter = nodemailer.createTransport({
            host: 'smtp-mail.outlook.com',
            port: 587,
            secure: false, // use SSL
            auth: {
                user: 'mlio6070@outlook.com',
                pass: 'vzaggvwLrsZwC4s',
            }
        });
        const mailOptions = {
            from: 'mlio6070@outlook.com',
            to: recepient,
            subject: 'Payment Status',
            text: text,
            //   html:text
        };
        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            }
            else {
                console.log('Email sent:', info.response);
            }
        });
    });
}
exports.sendMail = sendMail;
