import nodemailer from 'nodemailer';
import validator from 'validator';
const config = useRuntimeConfig();



export default defineEventHandler(async (event) => {
  // ziwa.co.ke MAIL SERVER TRANSPORTER
  const transporter = nodemailer.createTransport({
    host: config.MAILHOST,
    port: config.MAILPORT,
    secure: true,
    auth: {
      user: config.MAILUSER,
      pass: config.MAILPASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
      ignoreTLS: true,
    }
  });


  let date = new Date().toLocaleString('en-GB').split(",")
  let orderDate = date[0]

  // GMAIL TRANSPORTER
  // const transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   // host: config.MAILHOST,
  //   // port: config.MAILPORT,
  //   auth: {
  //     user: config.MAILUSER,
  //     pass: config.MAILPASSWORD,
  //   },
  //   tls: {
  //     rejectUnauthorized: false,
  //     ignoreTLS: true,
  //   }
  // });
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

  let products = '<div>'
  body.order.products.forEach(item => {
    products += `
        <td align="left" bgcolor="#cfe2f3" style="padding:0;Margin:0;padding-top:20px;padding-right:20px;padding-left:20px;background-color:#cfe2f3;border-radius:11px">
               <table cellpadding="0" cellspacing="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr>
                  <td align="left" style="padding:0;Margin:0;width:560px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="left" class="es-text-5149" style="padding:0;Margin:0"><p style="Margin:0;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px"></p>
                       <table cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%" class="es-table" role="presentation">
                         <tr>
                          <td style="padding:0;Margin:0;background-color:#cfe2f3;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;color:#0b5394"><h6 style="Margin:0;font-family:arial, 'helvetica neue', helvetica, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:16px;font-style:normal;font-weight:normal;line-height:19px;color:#333333"><strong>Product</strong></h6></td>
                          <td style="padding:0;Margin:0;border-color:#efefef;background-color:#cfe2f3;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;color:#0b5394"><h6 style="Margin:0;font-family:arial, 'helvetica neue', helvetica, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:16px;font-style:normal;font-weight:normal;line-height:19px;color:#333333"><strong>Quantity</strong></h6></td>
                          <td style="padding:0;Margin:0;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;color:#0b5394"><h6 style="Margin:0;font-family:arial, 'helvetica neue', helvetica, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:16px;font-style:normal;font-weight:normal;line-height:19px;color:#333333"><strong>Price</strong></h6></td>
                         </tr>
                         <tr>
                          <td style="padding:0;Margin:0;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;color:#333333"><span class="es-text-mobile-size-14" style="font-size:14px;line-height:21px">${item._value.title} ${item._value.capacity}</span><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">${item._value.currentBottleColor} ${item}</p></td>
                          <td style="padding:0;Margin:0;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;color:#333333;font-size:14px;line-height:21px" class="es-text-mobile-size-14">1</td>
                          <td style="padding:0;Margin:0;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;color:#333333;font-size:14px;line-height:21px" class="es-text-mobile-size-14">${item._value.cumulativeCost}</td>
                         </tr>
                       </table><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px"></p></td>
                     </tr>
                     <tr>
                      <td align="center" style="padding:20px;Margin:0;font-size:0">
                       <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0" class="es-spacer" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                         <tr>
                          <td style="padding:0;Margin:0;border-bottom:1px solid #cccccc;background:none;height:1px;width:100%;margin:0px"></td>
                         </tr>
                       </table></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
      `
  })
  products += '</div>'

  const customerEmail =
    `
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
 <head>
  <meta charset="UTF-8">
  <meta content="width=device-width, initial-scale=1" name="viewport">
  <meta name="x-apple-disable-message-reformatting">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta content="telephone=no" name="format-detection">
  <title>New Template</title><!--[if (mso 16)]>
    <style type="text/css">
    a {text-decoration: none;}
    </style>
    <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
<xml>
    <o:OfficeDocumentSettings>
    <o:AllowPNG></o:AllowPNG>
    <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
</xml>
<![endif]--><!--[if !mso]><!-- -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i"><!--<![endif]-->
  <style type="text/css">
.rollover:hover .rollover-first {
  max-height:0px!important;
  display:none!important;
  }
  .rollover:hover .rollover-second {
  max-height:none!important;
  display:block!important;
  }
  .rollover span {
  font-size:0px;
  }
  u + .body img ~ div div {
  display:none;
  }
  #outlook a {
  padding:0;
  }
  span.MsoHyperlink,
span.MsoHyperlinkFollowed {
  color:inherit;
  mso-style-priority:99;
  }
  a.es-button {
  mso-style-priority:100!important;
  text-decoration:none!important;
  }
  a[x-apple-data-detectors] {
  color:inherit!important;
  text-decoration:none!important;
  font-size:inherit!important;
  font-family:inherit!important;
  font-weight:inherit!important;
  line-height:inherit!important;
  }
  .es-desk-hidden {
  display:none;
  float:left;
  overflow:hidden;
  width:0;
  max-height:0;
  line-height:0;
  mso-hide:all;
  }
  .es-button-border:hover > a.es-button {
  color:#ffffff!important;
  }
@media only screen and (max-width:600px) {*[class="gmail-fix"] { display:none!important } p, a { line-height:150%!important } h1, h1 a { line-height:120%!important } h2, h2 a { line-height:120%!important } h3, h3 a { line-height:120%!important } h4, h4 a { line-height:120%!important } h5, h5 a { line-height:120%!important } h6, h6 a { line-height:120%!important } h1 { font-size:30px!important; text-align:left } h2 { font-size:24px!important; text-align:left } h3 { font-size:20px!important; text-align:left } h4 { font-size:24px!important; text-align:left } h5 { font-size:20px!important; text-align:left } h6 { font-size:16px!important; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:30px!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:24px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-header-body h4 a, .es-content-body h4 a, .es-footer-body h4 a { font-size:24px!important } .es-header-body h5 a, .es-content-body h5 a, .es-footer-body h5 a { font-size:20px!important } .es-header-body h6 a, .es-content-body h6 a, .es-footer-body h6 a { font-size:16px!important } .es-menu td a { font-size:14px!important } .es-header-body p, .es-header-body a { font-size:14px!important } .es-content-body p, .es-content-body a { font-size:14px!important } .es-footer-body p, .es-footer-body a { font-size:14px!important } .es-infoblock p, .es-infoblock a { font-size:12px!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3, .es-m-txt-c h4, .es-m-txt-c h5, .es-m-txt-c h6 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3, .es-m-txt-r h4, .es-m-txt-r h5, .es-m-txt-r h6 { text-align:right!important } .es-m-txt-j, .es-m-txt-j h1, .es-m-txt-j h2, .es-m-txt-j h3, .es-m-txt-j h4, .es-m-txt-j h5, .es-m-txt-j h6 { text-align:justify!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3, .es-m-txt-l h4, .es-m-txt-l h5, .es-m-txt-l h6 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-m-txt-r .rollover:hover .rollover-second, .es-m-txt-c .rollover:hover .rollover-second, .es-m-txt-l .rollover:hover .rollover-second { display:inline!important } .es-m-txt-r .rollover span, .es-m-txt-c .rollover span, .es-m-txt-l .rollover span { line-height:0!important; font-size:0!important } .es-spacer { display:inline-table } a.es-button, button.es-button { font-size:18px!important; line-height:120%!important } a.es-button, button.es-button, .es-button-border { display:inline-block!important } .es-m-fw, .es-m-fw.es-fw, .es-m-fw .es-button { display:block!important } .es-m-il, .es-m-il .es-button, .es-social, .es-social td, .es-menu { display:inline-block!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .adapt-img { width:100%!important; height:auto!important } .es-mobile-hidden, .es-hidden { display:none!important } .es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } .es-social td { padding-bottom:10px } .h-auto { height:auto!important } .es-text-1381 .es-text-mobile-size-16, .es-text-1381 .es-text-mobile-size-16 * { font-size:16px!important; line-height:150%!important } .es-text-2131 .es-text-mobile-size-14, .es-text-2131 .es-text-mobile-size-14 * { font-size:14px!important; line-height:150%!important } .es-text-2586 .es-text-mobile-size-14, .es-text-2586 .es-text-mobile-size-14 * { font-size:14px!important; line-height:150%!important } .es-text-5149 .es-text-mobile-size-14, .es-text-5149 .es-text-mobile-size-14 * { font-size:14px!important; line-height:150%!important } .es-text-1381 .es-text-mobile-size-14, .es-text-1381 .es-text-mobile-size-14 * { font-size:14px!important; line-height:150%!important } }
@media screen and (max-width:384px) {.mail-message-content { width:414px!important } }
</style>
 </head>
 <body class="body" style="width:100%;height:100%;padding:0;Margin:0">
  <div dir="ltr" class="es-wrapper-color" lang="en" style="background-color:#F6F6F6"><!--[if gte mso 9]>
			<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
				<v:fill type="tile" color="#f6f6f6"></v:fill>
			</v:background>
		<![endif]-->
   <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#F6F6F6">
     <tr>
      <td valign="top" style="padding:0;Margin:0">
       <table class="es-header" cellspacing="0" cellpadding="0" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important;background-color:transparent;background-repeat:repeat;background-position:center top">
         <tr>
          <td align="center" style="padding:0;Margin:0">
           <table class="es-header-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
             <tr>
              <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-right:20px;padding-left:20px">
               <table cellpadding="0" cellspacing="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr>
                  <td align="left" style="padding:0;Margin:0;width:560px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" style="padding:0;Margin:0;font-size:0"><img src="https://eirctcb.stripocdn.email/content/guids/CABINET_922ea16c7f72b3bae80c86d8c04b4aded1bc66dd5423b132afc4ca64d3923ac5/images/ziwalogo_8VA.png" alt="" width="75" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table>
       <table class="es-content" cellspacing="0" cellpadding="0" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important">
         <tr>
          <td align="center" style="padding:0;Margin:0">
           <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
             <tr>
              <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-right:20px;padding-left:20px">
               <table width="100%" cellspacing="0" cellpadding="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr>
                  <td valign="top" align="center" style="padding:0;Margin:0;width:560px">
                   <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="left" style="padding:0;Margin:0"><h3 align="center" style="Margin:0;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:20px;font-style:normal;font-weight:normal;line-height:24px;color:#333333"><strong>Order Confirmation</strong></h3></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table>
       <table class="es-footer" cellspacing="0" cellpadding="0" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important;background-color:transparent;background-repeat:repeat;background-position:center top">
         <tr>
          <td align="center" style="padding:0;Margin:0">
           <table class="es-footer-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;background-color:#ffffff;width:600px" role="none">
             <tr>
              <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-right:20px;padding-left:20px">
               <table cellpadding="0" cellspacing="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr>
                  <td align="left" style="padding:0;Margin:0;width:560px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="left" class="es-text-1381" style="padding:0;Margin:0"><p style="Margin:0;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;letter-spacing:0;color:#333333;font-size:16px" class="es-text-mobile-size-16"><strong>Order Number/MPesa Receipt Number:</strong> <span style="font-size:14px;line-height:21px">${body.paymentDetails.MpesaReceiptNumber}</span></p><p style="Margin:0;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;letter-spacing:0;color:#666666;font-size:14px">${orderDate}</p></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
             <tr>
              <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-right:20px;padding-left:20px">
               <table cellpadding="0" cellspacing="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr>
                  <td align="left" style="padding:0;Margin:0;width:560px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="left" style="padding:0;Margin:0"><p style="Margin:0;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">Hello ${body.formData.firstName},</p><p style="Margin:0;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">Whoop whoop!</p><p style="Margin:0;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">Your order has been received and is being processed. Your hydration buddy will be on its way to you within 72.</p><p style="Margin:0;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">Thank you for joining the coolest side of hydration!</p></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
             <tr>
              <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-right:20px;padding-left:20px"><!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:270px" valign="top"><![endif]-->
               <table cellpadding="0" cellspacing="0" class="es-left" align="left" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                 <tr>
                  <td align="left" style="padding:0;Margin:0;width:270px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="left" class="es-text-2131" style="padding:0;Margin:0"><h6 class="es-text-mobile-size-14" style="Margin:0;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:14px;font-style:normal;font-weight:normal;line-height:21px;color:#333333"><strong>Your Details</strong></h6><p style="Margin:0;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">${fullName}</p><p style="Margin:0;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">${body.formData.email}</p><p style="Margin:0;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">${body.formData.phoneNumber}</p></td>
                     </tr>
                   </table></td>
                 </tr>
               </table><!--[if mso]></td><td style="width:20px"></td><td style="width:270px" valign="top"><![endif]-->
               <table cellpadding="0" cellspacing="0" class="es-right" align="right" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                 <tr>
                  <td align="left" style="padding:0;Margin:0;width:270px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="left" class="es-text-2586" style="padding:0;Margin:0"><h6 class="es-text-mobile-size-14" style="Margin:0;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:14px;font-style:normal;font-weight:normal;line-height:21px;color:#333333"><strong>Delivery Location</strong></h6><p style="Margin:0;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">${body.order.deliveryRoute}</p><p style="Margin:0;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">${body.order.deliveryLocation}</p><p style="Margin:0; mso-line-height-rule:exactly;font-family:'open sans','helvetica neue',helvetica, arial, sans-serif; line-height:21px;letter-spacing:0;color:#333333; font-size:14px">${body.formData.address}</p></td>
                     </tr>
                   </table></td>
                 </tr>
               </table><!--[if mso]></td></tr></table><![endif]--></td>
             </tr>
             <tr>
              <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-right:20px;padding-left:20px">
               <table cellpadding="0" cellspacing="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr>
                  <td align="left" style="padding:0;Margin:0;width:560px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" style="padding:20px;Margin:0;font-size:0">
                       <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0" class="es-spacer" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                         <tr>
                          <td style="padding:0;Margin:0;border-bottom:1px solid #cccccc;background:none;height:1px;width:100%;margin:0px"></td>
                         </tr>
                       </table></td>
                     </tr>
                     <tr>
                      <td align="left" style="padding:0;Margin:0"><h6 style="Margin:0;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:16px;font-style:normal;font-weight:normal;line-height:19px;color:#333333"><strong>Product(s) Purchased</strong></h6></td>
                     </tr>
                     <tr>
                      <td align="left" style="padding:0;Margin:0">
                       <hr style="Margin:0"></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
             <tr>
              ${products}
             <tr>
              <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-right:20px;padding-left:20px"><!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:270px" valign="top"><![endif]-->
               <table cellpadding="0" cellspacing="0" class="es-left" align="left" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                 <tr>
                  <td align="left" style="padding:0;Margin:0;width:270px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="left" style="padding:0;Margin:0"><p style="Margin:0;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">​MPesa Receipt Code:</p><p style="Margin:0;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">Bottle Price:</p>
                      
                      <p style="Margin:0;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">Delivery Fees to ${body.order.deliveryRoute} - ${body.order.deliveryLocation}:</p><p style="Margin:0;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px"><strong>TOTAL</strong></p></td>
                     </tr>
                   </table></td>
                 </tr>
               </table><!--[if mso]></td><td style="width:20px"></td><td style="width:270px" valign="top"><![endif]-->
               <table cellpadding="0" cellspacing="0" class="es-right" align="right" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                 <tr>
                  <td align="left" style="padding:0;Margin:0;width:270px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="left" style="padding:0;Margin:0"><p style="Margin:0;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px" align="right">${body.paymentDetails.MpesaReceiptNumber}</p><p style="Margin:0;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px" align="right">${body.paymentDetails.Amount}</p>
                      
                      <p style="Margin:0;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px" align="right">${body.order.deliveryCost}</p><p style="Margin:0;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px" align="right">${body.paymentDetails.Amount}</p></td>
                     </tr>
                   </table></td>
                 </tr>
               </table><!--[if mso]></td></tr></table><![endif]--></td>
             </tr>
             <tr>
              <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-right:20px;padding-left:20px">
               <table cellpadding="0" cellspacing="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr>
                  <td align="left" style="padding:0;Margin:0;width:560px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="left" style="padding:0;Margin:0"><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">Kind Regards,</p><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">Ziwa</p></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table></td>
     </tr>
   </table>
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

  const companyName = "Ziwa Limited"
  const fromEmail = "orders@ziwa.co.ke"

  const customerOptions = {
    from: `"${companyName}" <${fromEmail}>`,
    to: `${body.formData.email}`,
    subject: 'Order Confirmation',
    html: customerEmail,
  }

  try {
    // isValid(body)
    //   .then(async (body) => {
    const mail = await transporter.sendMail(mailOptions)

    const customerMail = await transporter.sendMail(customerOptions)
    // })

    // console.log('Message sent: %s', mail.messageId);
    // console.log('Mail: %s', mail.accepted);

    console.log('Customer Email sent:', customerMail.accepted)

    if (mail.accepted.length > 0 && customerMail.length > 0) {
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
    console.log(error);
    return Promise.reject()
  }


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