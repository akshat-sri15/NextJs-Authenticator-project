import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({email,emailType,userId}:any) => {
  try {
   const hashedToken=await bcryptjs.hash(userId.toString(),10);
   if(emailType==='VERIFY'){
   await User.findByIdAndUpdate(userId,
    {verifyToken:hashedToken,verifyTokenExpiry:Date.now()+3600000}
   )
    }
    else if(emailType==='RESET'){
        await User.findByIdAndUpdate(userId,
    {forgotPasswordToken:hashedToken,forgotPasswordTokenExpiry:Date.now()+3600000}
   )
    }
    const transporter = nodemailer.createTransport({
        host:"sandbox.smtp.mailtrap.io",
        port:2525,
        auth:{
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
    });
    const mailOptions = {
      from:"Akshat@gmail.com",
      to: email,
      subject: emailType === 'VERIFY' ? 'Verify Your Account' : 'Reset Your Password',
      html:'<p> Click the link below to '
      +(emailType === 'VERIFY' ? 'verify your account' : 
        'reset your password')+'</p><a href="'+process.env.DOMAIN+'/'+
        (emailType === 'VERIFY' ? 'verifyemail' : 'resetpassword')+
        '?token='+hashedToken+'">Click here</a>'
      }
      const res=await transporter.sendMail(mailOptions);
      return res;
  } catch (error:any) {
    console.error('Error sending email:', error);
    throw new Error(error.message);
  }
}