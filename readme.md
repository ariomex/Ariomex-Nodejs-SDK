# Ariomex API Integration

This README file documents how to use the Ariomex API SDK to interact with various API endpoints. The Ariomex SDK provides methods to interact with general, account, wallet, bank, history, and order API endpoints.

You can find the API documentation at [https://apidoc.ariomex.com](https://apidoc.ariomex.com).

## Getting Started

To use the Ariomex API, you need to include the Ariomex SDK in your project and create an instance of the Ariomex class with your API key and secret.


### Installation

Ensure the `ariomex.js` file is available in your project directory.

### Initialization

```javascript
// Include the Ariomex API SDK class
const Ariomex = require('./ariomex');
// Create an instance of the Ariomex class
const ariomex = new Ariomex('your_api_key', 'your_api_secret');
```

## Usage

### General

```javascript
// Example usage of the swagger method
const swagger = await ariomex.general.swagger();

// Example usage of the ping method
const pingResponse = await ariomex.general.ping();

// Example usage of the time method
const serverTime = await ariomex.general.time();

// Example usage of the exchange_info method
const exchangeInfo = await ariomex.general.exchange_info('btcusdt');

// Example usage of the coins_info method
const coinsInfo = await ariomex.general.coins_info('btc');

// Example usage of the orderbook method
const orderBook = await ariomex.general.orderbook('btcusdt');

// Example usage of the last_trades method
const lastTrades = await ariomex.general.last_trades('btcusdt');

// Example usage of the last_prices method
const lastPrices = await ariomex.general.last_prices('btcusdt');

// Example usage of the candlesticks method
const candlesticks = await ariomex.general.candlesticks('btcusdt', '5');
```

### Account

```javascript
// Example usage of the getAccountInfo method
const accountInfo = await ariomex.account.getAccountInfo();

// Example usage of the getBalance method
const balance = await ariomex.account.getBalance();

// Example usage of the getDustBalance method
const dustBalance = await ariomex.account.getDustBalance();

// Example usage of the convertDustBalance method
const conversionResult = await ariomex.account.convertDustBalance(['btc', 'eth']);
```

### Wallet

```javascript
// Example usage of the generateDepositAddress method
const generateDepositAddress = await ariomex.wallet.generateDepositAddress();

// Example usage of the getDepositAddress method
const depositAddress = await ariomex.wallet.getDepositAddress();

// Example usage of the withdrawIrt method
const withdrawalResponse = await ariomex.wallet.withdrawIrt('100', 'iban_uuid_here');

// Example usage of the withdrawCrypto method
const withdrawalResponse = await ariomex.wallet.withdrawCrypto('btc', 'btc', '1', 'address_uuid_here', 'optional_memo');

// Example usage of the getWithdrawAddresses method
const withdrawAddresses = await ariomex.wallet.getWithdrawAddresses();
```

### Bank

```javascript
// Example usage of the setBankCard method
const setCardResponse = await ariomex.bank.setBankCard('1234567890123456');

// Example usage of the setBankIban method
const setIbanResponse = await ariomex.bank.setBankIban('123456789012345678901234');

// Example usage of the getBankAccounts method
const bankAccounts = await ariomex.bank.getBankAccounts();
```

### History

```javascript
// Example usage of the getIrtDeposits method
const irtDeposits = await ariomex.history.getIrtDeposits('1715719124700', '1715719124700', 'completed', '1', '50');

// Example usage of the getCryptoDeposits method
const cryptoDeposits = await ariomex.history.getCryptoDeposits('btc', 'btc', '1715719124700', '1715719124700', 'completed', '1', '50');

// Example usage of the getIrtWithdrawals method
const irtWithdrawals = await ariomex.history.getIrtWithdrawals('1715719124700', '1715719124700', 'completed', '1', '50');

// Example usage of the getCryptoWithdrawals method
const cryptoWithdrawals = await ariomex.history.getCryptoWithdrawals('btc', 'btc', '1715719124700', '1715719124700', 'completed', '1', '50');

// Example usage of the getOrders method
const orders = await ariomex.history.getOrders('btcusdt', '', '1715719124700', '1715719124700', 'limit', 'buy', 'completed', '1', '50');

// Example usage of the getTrades method
const trades = await ariomex.history.getTrades('btcusdt', '1715719124700', '1715719124700', 'buy', '1', '50');
```

### Order

```javascript
// Example usage of the setLimitBuy method
const limitBuyOrder = await ariomex.order.setLimitBuy('btcusdt', '10000', '0.1');

// Example usage of the setLimitSell method
const limitSellOrder = await ariomex.order.setLimitSell('btcusdt', '11000', '0.1');

// Example usage of the setMarketBuy method
const marketBuyOrder = await ariomex.order.setMarketBuy('btcusdt', '1000');

// Example usage of the setMarketSell method
const marketSellOrder = await ariomex.order.setMarketSell('btcusdt', '0.1');

// Example usage of the setSLTP method
const sltpOrder = await ariomex.order.setSLTP('btcusdt', '0.1', '9000', '12000');

// Example usage of the setSL method
const slOrder = await ariomex.order.setSL('btcusdt', '0.1', '9000');

// Example usage of the setStoplimitBuy method
const stoplimitBuyOrder = await ariomex.order.setStoplimitBuy('btcusdt', '0.1', '9500', '9600');

// Example usage of the setStoplimitSell method
const stoplimitSellOrder = await ariomex.order.setStoplimitSell('btcusdt', '0.1', '10500', '10400');

// Example usage of the cancelOrder method
const cancelOrderResponse = await ariomex.order.cancelOrder('btcusdt', 'order_uuid_here');

// Example usage of the cancelAllOrders method
const cancelAllOrdersResponse = await ariomex.order.cancelAllOrders('btcusdt');
```
