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

export const sendVerifcationEmail = async(email:string, token:string)=>{

 const url = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

  const info = await transporter.sendMail({
    to :email,
    subject : "verify your email",
    html: `Please click <a href="${url}">here</a> to verify your email.`
  })
  console.log('Email sent:', info.response);


}