import nodemailer from 'nodemailer';
import validator from 'validator';
const config = useRuntimeConfig();



export default defineEventHandler(async (event) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    // host: config.MAILHOST,
    // port: config.MAILPORT,
    auth: {
      user: config.MAILUSER,
      pass: config.MAILPASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
      ignoreTLS: true,
    }
  });
  // try {
  const body = await readBody(event);
  // const bodyContentValid = await isValid(body)

  // console.log('BODY TOP', body);
  const fullName = body.formData.firstName + ' ' + body.formData.lastName
  let template = '<div>'

  body.order.products.forEach(item => {
    template += `
                  <h1>Product Ordered: ${item._value.currentBottleColor} ${item._value.title} ${item._value.capacity}ml</h1>
                  
                  <h3>ORDER CUSTOMIZATION</h3>
                  <p style="font-weight: bold;">Customization Name: ${item._value.customName}</p>
                  <p style="font-weight: bold;">Name Printing Position: ${item._value.textPosition}</p>
                  <p style="font-weight: bold;">Customization Font: ${item._value.selectedFont}</p>
                  <p style="font-weight: bold;">Customization Fee: ${item._value.customizationFee}</p>
                  <h3>TOTAL COST</h3>
                  <p style="font-weight: bold;">The Total Cost of the bottle and customization fees: ${item._value.cumulativeCost} in total.</p>
                  <hr>
                  `
  });

  template += '</div>'

  template += `
            <h3>ORDER DELIVERY ADDRESS</h3>
                  <p style="font-weight: bold;">Delivery to Route: ${body.order.deliveryRoute}</p>
                  <p style="font-weight: bold;">
                  Estate: ${body.order.deliveryLocation}</p>
                  <p style="font-weight: bold;">Cost to Deliver: KSH.${body.order.deliveryCost} for delivery</p>
            <h3>PAYMENT DETAILS</h3>
                  <p style="font-weight: bold;">M-PESA Transaction ID: ${body.paymentDetails.MpesaReceiptNumber}</p>
                  <p style="font-weight: bold;">
                  Phone Number: +${body.paymentDetails.PhoneNumber}</p>
                  <p style="font-weight: bold;">Amount Paid: KSH.${body.paymentDetails.Amount} </p>
                  
  `

  template += '</div>'


  const emailFormat =
    `
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
      <body style="font-family: Arial, Helvetica, sans-serif ">
          <div
            style="max-width: 1020px; background: rgb(247, 244, 244);  border: 5px solid #39519f; margin: 0 auto; color: #39519f">
            <p style="padding: 10px; text-size: 15px; text-align: center; font-weight: bold;">You have a new <b>PRODUCT ORDER </b> from your Ziwa website shop</p>
            <h3 style="background: #39519f; padding: 10px; text-align: center; color: #ffffff;">The Order is from:</h3>
            <ul style="color: #0c0c0c">
              <li>Full Name: ${fullName}</li>
              <li>Customer's Email Address: ${body.formData.email}</li>
              <li>Customer's Phone Number: ${body.formData.phoneNumber}</li>
              <li>Customer's Physical Address: ${body.formData.address}</li>
              <li>Customer's specific order information: ${body.formData.optionalMessage}</li>
            </ul>
            <h3 style="background: #39519f; padding: 10px; text-align: center; color: #ffffff;">ORDER PARTICULARS</h3>
            <div style="padding: 5px 30px 5px 30px; color: #0c0c0c">
              ${template}

            </div>
          </div>
        </body>
      </html>
    `

  const mailOptions = {
    from: `"${fullName}" <${body.formData.email}>`,
    to: config.CONTACTMAIL,
    subject: body.formData.subject,
    // text: data.message,
    html: emailFormat,
  }

  try {
    // isValid(body)
    //   .then(async (body) => {
    const mail = await transporter.sendMail(mailOptions)
    // })

    // console.log('Message sent: %s', mail.messageId);
    // console.log('Mail: %s', mail.accepted);

    if (mail.accepted.length > 0) {
      setResponseStatus(event, 200)
      return { statusCode: 200 }
    }

    if (mail.rejected.length > 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Your order was not registered successfully. Please try again.'
      })
    }

    // return Promise.resolve()
  } catch (error) {
    // console.log(error);
    return Promise.reject()
  }



  //   await transporter.sendMail(mailOptions, function (err, info) {
  //     if (err) {
  //       console.log('Error is', err);
  //       resolve(false)
  //     } else {
  //       console.log('Email sent', info.response);
  //       return { statusCode: 200 }
  //     }
  //   })
  // } catch (error) {
  //   return Promise.reject(error)
  //   // console.log('CATCH ERROR', error);
  //   // sendError(event, createError({ statusCode: 400, statusMessage: error }));
  // }
});

async function isValid(body) {
  const errors = [];

  if (validator.isEmpty(body.formData.email || ''))
    errors.push({
      field: 'email',
      error: 'Field is required.',
    });
  if (validator.isEmpty(body.formData.firstName || '')) {
    errors.push({ field: 'name', error: 'Field is required.' });
    if (validator.isEmpty(body.formData.lastName || ''))
      errors.push({ field: 'name', error: 'Field is required.' });
    // if (validator.isEmpty(body.subject || ''))
    //   errors.push({ field: 'subject', error: 'Field is required.' });
    // if (validator.isEmpty(body.formData.optionalMessage || ''))
    //   errors.push({ field: 'message', error: 'Field is required.' });
    if (!validator.isEmail(body.formData.email || ''))
      errors.push({ field: 'email', error: 'Field should be a valid email.' });

    if (errors.length > 0) {
      return Promise.reject(errors);
    } else {
      return Promise.resolve({
        email: validator.normalizeEmail(body.formData.email),
        subject: validator.escape(body.formData.subject),
        name: validator.escape(body.formData.name),
        // message: validator.escape(body.formData.optionalMessage),
      });
    }
  }
}