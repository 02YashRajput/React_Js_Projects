var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});
export const sendVerifcationEmail = (email, token) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `${process.env.CLIENT_URL}/verify-email?token=${token}`;
    const info = yield transporter.sendMail({
        to: email,
        subject: "verify your email",
        html: `Please click <a href="${url}">here</a> to verify your email.`
    });
    console.log('Email sent:', info.response);
});
