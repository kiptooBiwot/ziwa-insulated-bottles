// import { useMailer } from '#mailer'

// export const SendMail = { template, to, from, subject }

// export async function sendGmail(request) {
//   const mailService = useMailer()
//   const gmailTransporter = mailService.gmailTransporter()

//   return await gmailTransporter.sendMail({
//     requestId: 'test-key',
//     options: {
//       to: request.to,
//       subject: request.subject,
//       text: request.template.text,
//       html: request.template.html
//     },
//     transporter: gmailTransporter
//   })
// }