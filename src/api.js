const axios = require('axios').default;
const config = require('./const/config.js');
const assert = require('assert');

class AiOpenPlatformApi {
  constructor({
    env,            // Environment of the system. (sandbox, production)
    merchantApiKey, // Merchant API key. Obtained from the AI open platform.
  }) {
    assert(['production', 'sandbox'].includes(env), 'The env properties must be either production or sandbox.');
    assert(merchantApiKey, 'You must fill in the merchantApiKey properties.');

    this.config = {
      env: env,
      merchantApiKey: merchantApiKey,
      envConfig: config[env],
    };
  }

  isHeaderMerchantApiKeyValid(headers) {
    if (!headers) {
      return false;
    }
    if (!headers['x-merchant-api-key']) {
      return false;
    }
    if (headers['x-merchant-api-key'] === this.config.merchantApiKey) {
      return true;
    }
    return false;
  }

  isMerchantApiKeyValid(headerField) {
    if (!headerField) {
      return false;
    }
    if (headerField === this.config.merchantApiKey) {
      return true;
    }
    return false;
  }

  async chargeSubscriber({
    invoiceNo,          // Type: String, The invoice number. Will be displayed in the user's wallet page in the AI Open Platform.
    subscriptionId,     // Type: ObjectId, The ID of the subscription. Can be obtained via subscribe webhook.
    appName,            // Type: String, Your app name
    address,            // Type: String, EVM address of your subscriber
    tokenCost,          // Type: Number, amount of tokens to charge
    fromTime,           // Date Object of the charging period from
    toTime,             // Date Object of the charging period to
  }) {

    const { data } = await axios.put(`${this.config.envConfig.baseUrl}/aop/api/ext/charge/subscription`, {
      invoiceNo, subscriptionId, appName, address, tokenCharged: tokenCost, fromTime: new Date(fromTime).toISOString(), toTime: new Date(toTime).toISOString(),
    }, {
      headers: {
        'x-merchant-api-key': this.config.merchantApiKey,
      },
      timeout: 30000,
    });
    return data;
  }

}

module.exports = AiOpenPlatformApi;
