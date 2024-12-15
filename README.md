### Introduction
Hi Guys. I'm the creator of the aiopenplatform. https://aiopenplatform.org

## About this package
AI open platform allows you to charge your subscribers token with APIs. Integrate this library to your system to start building your AI tools.

## How this package works?
1. Create an account at https://testnet.aiopenplatform.org
2. Create a service after login.
3. Configure the webhook.
4. Obtain the Merchant API key.
5. Once you subscribers, you can charge the service fee with this library.

## How to apply this package?
Add this package to your Node.JS application as dependency.
```bash
npm install --save aiopenplatform-merchant-sdk
```
or Yarn
```bash
yarn add aiopenplatform-merchant-sdk
```

Setup the API class.
```javascript
const aiOpenPlatform = new AiOpenPlatform({
  env: 'sandbox',       // The environment flag. Either sandbox or production.
  merchantApiKey: ''    // The API key obtained at https://testnet.aiopenplatform.org or https://aiopenplatform.org
});
```

After that, you can use the charge API to charge the subscribers.
```javascript
const response = await aiOpenPlatform.chargeSubscriber({
  invoiceNo: 'INV#30247',                                  // Type: String, The invoice number. Will be displayed in the user's wallet page in the AI Open Platform.
  subscriptionId: '',                                      // Type: ObjectId, The ID of the subscription. Can be obtained via subscribe webhook.
  appName: 'Testing AI',                                   // Type: String, Your app name
  address: '0x7462xxxxxxxxxxx',                            // Type: String, EVM address of your subscriber
  tokenCost: 10.67,                                        // Type: Number, amount of tokens to charge
  fromTime: new Date('2024-12-15T00:00:00.000'),           // Date Object of the charging period from
  toTime: new Date('2024-12-15T01:00:00.000'),             // Date Object of the charging period to
});
```

Then, you should want for the server to respond.
```javascript
response.status         // Either ok or nok. If the status is ok, the charge transaction id will be placed to response.chargeId.
response.chargeId       // Only present when the charge action is completed.
response.error          // The error message when the charge is failed. (English)
response.errorCode      // Reference error code. E001: The subscriber do not have enough token. E002: The subscription does not have enough allowance.
```

# Reference
1. https://aiopenplatform.org
