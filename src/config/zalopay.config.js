module.exports = {
  endpoint: {
    sandbox: {
      create_order: process.env.ZALOPAY_CREATE_ORDER_URL,
      query_status: "https://sb-openapi.zalopay.vn/v2/query"
    }
  },
  callback_url: `${process.env.API_URL}/api/donations/callback`,
  redirect_url: `${process.env.CLIENT_URL}/payment/callback`
}; 