import moment from "moment"
import { useFetch, useNuxtApp } from "nuxt/app"
import axios from 'axios'

const getAccessToken = async () => {
  // console.log('GET ACCESS TOKEN RUN')
  const config = useRuntimeConfig()

  const consumer_key = config.CONSUMER_KEY
  const consumer_secret = config.CONSUMER_SECRET

  const authUrl = process.env.ACCESS_TOKEN_URL

  const auth =
    "Basic " +
    new Buffer.from(consumer_key + ":" + consumer_secret).toString("base64")

  // console.log('AUTH:', auth);
  try {

    const response = await axios.get(authUrl, {
      headers: {
        'Authorization': auth
      }
    })
    return response

  } catch (error) {
    // console.log(error);
    throw error;
  }
}

export default defineEventHandler(async (event) => {

  // console.log('WE ARE REACHING THIS STK ROUTE!');

  const token = await getAccessToken()

  let { amount, phone } = await readBody(event)

  // console.log('TOKEN:', token.data.access_token);
  // const amount = body.amount
  phone = phone.substring(1)
  let accessToken = token.data.access_token

  // console.log('AMOUNT:', amount)
  // console.log('PHONE:', phone)

  const url = process.env.MPESA_URL
  const auth = `Bearer ${accessToken}`
  const passkey = process.env.MPESA_PASSKEY
  // const shortcode = process.env.MPESA_SHORTCODE
  const shortcode = process.env.MPESA_SHORTCODE
  const tillNumber = process.env.MPESA_TILLNUMBER
  const timestamp = moment().format("YYYYMMDDHHmmss")
  const password = new Buffer.from(shortcode + passkey + timestamp).toString("base64")

  // console.log('AUTH', auth);
  // console.log('Timestamp', timestamp);
  // console.log('Password', password);
  // console.log('URL', url);
  // console.log('SHORTCODE', shortcode);

  const data = {
    BusinessShortCode: shortcode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerBuyGoodsOnline",
    //"CustomerPayBillOnline", // CustomerBuyGoodsOnline - Till number
    // Amount: amount,
    Amount: 1,
    PartyA: `254${phone}`,
    // Party B Should be the Till Number not shortcode
    PartyB: tillNumber,
    PhoneNumber: `254${phone}`,
    CallBackURL: `${process.env.MPESA_CALLBACK}/payment/callback`,
    // CallBackURL: 'https://536d-102-216-154-61.ngrok-free.app/payment/callback',
    // CallBackURL: 'https://prdd8gtt-3000.euw.devtunnels.ms/payment/callback',
    AccountReference: `254${phone}`, //`254${phone}`
    TransactionDesc: "Payment for goods",
  }

  try {
    const response = await axios.post(url, data, {
      headers: {
        'Authorization': auth,
        'Content-Type': 'application/json'
      },
    },)

    // console.log('STK RESPONSE.DATA', response.data)

    const responseData = []
    responseData.push(response.data)

    if (response.data.ResponseCode == 0) {
      const transaction = {
        MerchantRequestID: response.data.MerchantRequestID,
        CheckoutRequestID: response.data.CheckoutRequestID,
        ResultCode: response.data.ResponseCode,
        ResultDesc: response.data.ResponseDescription,
      };
    } else {
      throw createError({
        statusCode: 400,
        statusMessage: 'An error occurred sending the PushSTK'
      })
    }

    return response.data
  } catch (error) {
    // console.log(error.response)
    throw createError({
      statusCode: 400,
      statusMessage: 'An error occurred sending the PushSTK',
      statusMessage: error['response']['statusText']
    })
  }

  return {
    // body,
    message: 'Push STK Route handled! RUNS FROM routes folder'
  }
})