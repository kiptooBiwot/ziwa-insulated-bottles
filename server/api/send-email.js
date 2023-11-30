import nodemailer from 'nodemailer';
import validator from 'validator';
const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    // secure: true,
    auth: {
      user: config.MAILUSER,
      pass: config.MAILPASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
      ignoreTLS: true,
    }
  })


  const body = await readBody(event)

  const emailDetails = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          @media only screen and (max-width: 620px) {
            h1 {
              font-size: 20px;
              padding: 5px;
            }
          }
        </style>
      </head>
      <body>
         <div
            style="max-width: 1020px; background: rgb(247, 244, 244);  border: 5px solid #39519f; margin: 0 auto; color: #39519f">
            <p style="padding: 10px; text-size: 15px; text-align: center; font-weight: bold;">You have a new <b>CONTACT PAGE MESSAGE</b> from your Ziwa website contact page</p>
            <h3 style="background: #39519f; padding: 10px; text-align: center; color: #ffffff;">The Message details:</h3>
            <ul style="color: #0c0c0c">
              <li><b>Customer's Full Name: </b> ${body.fullName}</li>
              <li><b>Customer's Email Address: </b> ${body.email}</li>
              <li><b>Customer's Phone Number: </b> ${body.mobileNumber}</li>
              <li><b>Customer's message: </b> ${body.message}</li>
            </ul>
          </div> 
      </body>
    `

  const mailOptions = {
    from: `"${body.fullName}" <${body.fullName}`,
    to: config.CONTACTMAIL,
    subject: 'An Email from the Ziwa Contact Form',
    html: emailDetails
  }

  try {
    const mail = await transporter.sendMail(mailOptions)

    if (mail.accepted.length > 0) {
      setResponseStatus(event, 200)
      return { statusCode: 200 }
    }

    if (mail.rejected.length > 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Your message was not received. Please try again.'
      })
    }


  } catch (error) {
    // console.log(error);
    return Promise.reject()
  }
})