const crypto = require('crypto');
const axios = require('axios');
class Ariomex {
    constructor(apiKey = '', apiSecret = '') {
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
        this.apiUrl = 'https://api.ariomex.com';
        this.general = new General(this);
        this.account = new Account(this);
        this.wallet = new Wallet(this);
        this.bank = new Bank(this);
        this.history = new History(this);
        this.order = new Order(this);
    }
    async signAndSend(url, query, method, isPrivateEndpoint) {
        if (isPrivateEndpoint) {
            query.timestamp = String(Math.round(Date.now()));
            const queryParameters = new URLSearchParams(query).toString();
            this.signature = crypto.createHmac('sha256', this.apiSecret).update(queryParameters).digest('hex');
        }
        let fullUrl = `${this.apiUrl}${url}`;
        let requestData;
        if (!['GET', 'DELETE'].includes(method)) {
            requestData = JSON.stringify(query);
        } else {
            fullUrl += `?${new URLSearchParams(query).toString()}`;
            requestData = null;
        }
        return this.sendRequest(fullUrl, method, isPrivateEndpoint, requestData);
    }
    async sendRequest(url, method, isPrivateEndpoint, requestData) {
        const headers = { 'Content-Type': 'application/json' };
        if (isPrivateEndpoint) {
            headers['X-ARX-APIKEY'] = this.apiKey;
            headers['X-ARX-SIGNATURE'] = this.signature;
        }
        const axiosConfig = {
            url,
            method,
            headers,
            maxRedirects: 10,
            timeout: 60000,
            followRedirect: true,
            validateStatus: () => true  // Allows handling non-2xx responses
        };
        if (requestData !== null) {
            axiosConfig.data = requestData;
        }
        try {
            const response = await axios(axiosConfig);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to send request: ${error.message}`);
        }
    }
}
class General {
    constructor(parent) {
        this.parent = parent;
    }
    async swagger() {
        const url = '/v1/public/swagger';
        const isPrivateEndpoint = false;
        const method = 'GET';
        const query = {};
        return this.parent.signAndSend(url, query, method, isPrivateEndpoint);
    }
    async ping() {
        const url = '/v1/public/ping';
        const isPrivateEndpoint = false;
        const method = 'GET';
        const query = {};
        return this.parent.signAndSend(url, query, method, isPrivateEndpoint);
    }
    async time() {
        const url = '/v1/public/time';
        const isPrivateEndpoint = false;
        const method = 'GET';
        const query = {};
        return this.parent.signAndSend(url, query, method, isPrivateEndpoint);
    }
    async exchange_info(symbol = "") {
        const url = '/v1/public/exchange_info';
        const isPrivateEndpoint = false;
        const method = 'GET';
        const query = {};
        if (symbol !== "") {
            query.symbol = symbol;
        }
        return this.parent.signAndSend(url, query, method, isPrivateEndpoint);
    }
    async coins_info(symbol = "") {
        const url = '/v1/public/coins_info';
        const isPrivateEndpoint = false;
        const method = 'GET';
        const query = {};
        if (symbol !== "") {
            query.symbol = symbol;
        }
        return this.parent.signAndSend(url, query, method, isPrivateEndpoint);
    }
    async orderbook(symbol = "") {
        const url = '/v1/public/orderbook';
        const isPrivateEndpoint = false;
        const method = 'GET';
        const query = {};
        if (symbol !== "") {
            query.symbol = symbol;
        }
        return this.parent.signAndSend(url, query, method, isPrivateEndpoint);
    }
    async last_trades(symbol = "") {
        const url = '/v1/public/last_trades';
        const isPrivateEndpoint = false;
        const method = 'GET';
        const query = {};
        if (symbol !== "") {
            query.symbol = symbol;
        }
        return this.parent.signAndSend(url, query, method, isPrivateEndpoint);
    }
    async last_prices(symbol = "") {
        const url = '/v1/public/last_prices';
        const isPrivateEndpoint = false;
        const method = 'GET';
        const query = {};
        if (symbol !== "") {
            query.symbol = symbol;
        }
        return this.parent.signAndSend(url, query, method, isPrivateEndpoint);
    }
    async candlesticks(symbol, resolution, from = "", to = "") {
        const url = '/v1/public/candlesticks';
        const isPrivateEndpoint = false;
        const method = 'GET';
        const query = { symbol, resolution };
        if (from !== "") {
            query.from = from;
        }
        if (to !== "") {
            query.to = to;
        }
        return this.parent.signAndSend(url, query, method, isPrivateEndpoint);
    }
}
class Account {
    constructor(parent) {
        this.parent = parent;
    }
    async getAccountInfo() {
        const url = '/v1/private/account/info';
        const isPrivateEndpoint = true;
        const method = 'GET';
        const query = {};
        return this.parent.signAndSend(url, query, method, isPrivateEndpoint);
    }
    async getBalance() {
        const url = '/v1/private/account/get_balance';
        const isPrivateEndpoint = true;
        const method = 'GET';
        const query = {};
        return this.parent.signAndSend(url, query, method, isPrivateEndpoint);
    }
    async getDustBalance() {
        const url = '/v1/private/account/get_dust_balance';
        const isPrivateEndpoint = true;
        const method = 'GET';
        const query = {};
        return this.parent.signAndSend(url, query, method, isPrivateEndpoint);
    }
    async convertDustBalance(coinsList) {
        const url = '/v1/private/account/convert_dust_balance';
        const isPrivateEndpoint = true;
        const method = 'POST';
        const query = {
            coinsList: coinsList
        };
        return this.parent.signAndSend(url, query, method, isPrivateEndpoint);
    }
}
class Wallet {
    constructor(parent) {
        this.parent = parent;
    }
    async generateDepositAddress() {
        const url = '/v1/private/wallet/generate_deposit_address';
        const isPrivateEndpoint = true;
        const method = 'POST';
        const query = {};
        return this.parent.signAndSend(url, query, method, isPrivateEndpoint);
    }
    async getDepositAddress() {
        const url = '/v1/private/wallet/get_deposit_address';
        const isPrivateEndpoint = true;
        const method = 'GET';
        const query = {};
        return this.parent.signAndSend(url, query, method, isPrivateEndpoint);
    }
    async withdrawIrt(amount, ibanUuid) {
        const url = '/v1/private/wallet/withdraw_irt';
        const isPrivateEndpoint = true;
        const method = 'POST';
        const query = {
            amount: amount,
            iban_uuid: ibanUuid
        };
        return this.parent.signAndSend(url, query, method, isPrivateEndpoint);
    }
    async withdrawCrypto(symbol, network, amount, addressUuid, memo = "") {
        const url = '/v1/private/wallet/withdraw_crypto';
        const isPrivateEndpoint = true;
        const method = 'POST';
        const query = {
            symbol: symbol,
            network: network,
            amount: amount,
            address_uuid: addressUuid,
            memo: memo
        };
        return this.parent.signAndSend(url, query, method, isPrivateEndpoint);
    }
    async getWithdrawAddresses() {
        const url = '/v1/private/wallet/get_withdraw_address';
        const isPrivateEndpoint = true;
        const method = 'GET';
        const query = {};
        return this.parent.signAndSend(url, query, method, isPrivateEndpoint);
    }
}
class Bank {
    constructor(parent) {
        this.parent = parent;
    }
    async setBankCard(cardNumber) {
        const url = '/v1/private/bank/set_card';
        const isPrivateEndpoint = true;
        const method = 'POST';
        const query = {
            cardNumber: cardNumber
        };
        return this.parent.signAndSend(url, query, method, isPrivateEndpoint);
    }
    async setBankIban(iban) {
        const url = '/v1/private/bank/set_iban';
        const isPrivateEndpoint = true;
        const method = 'POST';
        const query = {
            iban: iban
        };
        return this.parent.signAndSend(url, query, method, isPrivateEndpoint);
    }
    async getBankAccounts() {
        const url = '/v1/private/bank/get_accounts';
        const isPrivateEndpoint = true;
        const method = 'GET';
        const query = {};
        return this.parent.signAndSend(url, query, method, isPrivateEndpoint);
    }
}
class History {
    constructor(parent) {
        this.parent = parent;
    }
    async getIrtDeposits(from = "", to = "", status = "", page = "", maxRowsPerPage = "") {
        const url = '/v1/private/history/deposit/irt';
        const isPrivateEndpoint = true;
        const method = 'GET';
        const query = {
            from: from,
            to: to,
            status: status,
            page: page,
            maxRowsPerPage: maxRowsPerPage
        };
        return this.parent.signAndSend(url, query, method, isPrivateEndpoint);
    }
    async getCryptoDeposits(symbol = "", network = "", from = "", to = "", status = "", page = "", maxRowsPerPage = "") {
        const url = '/v1/private/history/deposit/crypto';
        const isPrivateEndpoint = true;
        const method = 'GET';
        const query = {
            symbol: symbol,
            network: network,
            from: from,
            to: to,
            status: status,
            page: page,
            maxRowsPerPage: maxRowsPerPage
        };
        return this.parent.signAndSend(url, query, method, isPrivateEndpoint);
    }
    async getIrtWithdrawals(from = "", to = "", status = "", page = "", maxRowsPerPage = "") {
        const url = '/v1/private/history/withdrawals/irt';
        const isPrivateEndpoint = true;
        const method = 'GET';
        const query = {
            from: from,
            to: to,
            status: status,
            page: page,
            maxRowsPerPage: maxRowsPerPage
        };
        return this.parent.signAndSend(url, query, method, isPrivateEndpoint);
    }
    async getCryptoWithdrawals(symbol = "", network = "", from = "", to = "", status = "", page = "", maxRowsPerPage = "") {
        const url = '/v1/private/history/withdrawals/crypto';
        const isPrivateEndpoint = true;
        const method = 'GET';
        const query = {
            symbol: symbol,
            network: network,
            from: from,
            to: to,
            status: status,
            page: page,
            maxRowsPerPage: maxRowsPerPage
        };
        return this.parent.signAndSend(url, query, method, isPrivateEndpoint);
    }
    async getOrders(symbol = "", orderId = "", from = "", to = "", type = "", side = "", status = "", page = "", maxRowsPerPage = "") {
        const url = '/v1/private/history/orders';
        const isPrivateEndpoint = true;
        const method = 'GET';
        const query = {
            symbol: symbol,
            orderId: orderId,
            type: type,
            side: side,
            from: from,
            to: to,
            status: status,
            page: page,
            maxRowsPerPage: maxRowsPerPage
        };
        return this.parent.signAndSend(url, query, method, isPrivateEndpoint);
    }
    async getTrades(symbol = "", from = "", to = "", side = "", page = "", maxRowsPerPage = "") {
        const url = '/v1/private/history/trades';
        const isPrivateEndpoint = true;
        const method = 'GET';
        const query = {
            symbol: symbol,
            side: side,
            from: from,
            to: to,
            page: page,
            maxRowsPerPage: maxRowsPerPage
        };
        return this.parent.signAndSend(url, query, method, isPrivateEndpoint);
    }
}
class Order {
    constructor(parent) {
        this.parent = parent;
    }
    async setLimitBuy(symbol, price, volume) {
        const url = '/v1/private/order/limit/buy';
        const isPrivateEndpoint = true;
        const method = 'POST';
        const query = {
            symbol: symbol,
            price: price,
            volume: volume
        };
        return this.parent.signAndSend(url, query, method, isPrivateEndpoint);
    }
    async setLimitSell(symbol, price, volume) {
        const url = '/v1/private/order/limit/sell';
        const isPrivateEndpoint = true;
        const method = 'POST';
        const query = {
            symbol: symbol,
            price: price,
            volume: volume
        };
        return this.parent.signAndSend(url, query, method, isPrivateEndpoint);
    }
    async setMarketBuy(symbol, total) {
        const url = '/v1/private/order/market/buy';
        const isPrivateEndpoint = true;
        const method = 'POST';
        const query = {
            symbol: symbol,
            total: total
        };
        return this.parent.signAndSend(url, query, method, isPrivateEndpoint);
    }
    async setMarketSell(symbol, volume) {
        const url = '/v1/private/order/market/sell';
        const isPrivateEndpoint = true;
        const method = 'POST';
        const query = {
            symbol: symbol,
            volume: volume
        };
        return this.parent.signAndSend(url, query, method, isPrivateEndpoint);
    }
    async setSLTP(symbol, volume, slPrice, tpPrice) {
        const url = '/v1/private/order/sltp/sl_tp';
        const isPrivateEndpoint = true;
        const method = 'POST';
        const query = {
            symbol: symbol,
            volume: volume,
            sl_price: slPrice,
            tp_price: tpPrice
        };
        return this.parent.signAndSend(url, query, method, isPrivateEndpoint);
    }
    async setSL(symbol, volume, slPrice) {
        const url = '/v1/private/order/sltp/sl';
        const isPrivateEndpoint = true;
        const method = 'POST';
        const query = {
            symbol: symbol,
            volume: volume,
            sl_price: slPrice
        };
        return this.parent.signAndSend(url, query, method, isPrivateEndpoint);
    }
    async setStoplimitBuy(symbol, volume, price, stopPrice) {
        const url = '/v1/private/order/stoplimit/buy';
        const isPrivateEndpoint = true;
        const method = 'POST';
        const query = {
            symbol: symbol,
            volume: volume,
            price: price,
            stop: stopPrice
        };
        return this.parent.signAndSend(url, query, method, isPrivateEndpoint);
    }
    async setStoplimitSell(symbol, volume, price, stopPrice) {
        const url = '/v1/private/order/stoplimit/sell';
        const isPrivateEndpoint = true;
        const method = 'POST';
        const query = {
            symbol: symbol,
            volume: volume,
            price: price,
            stop: stopPrice
        };
        return this.parent.signAndSend(url, query, method, isPrivateEndpoint);
    }
    async cancelOrder(symbol, orderUuid) {
        const url = '/v1/private/order/cancel';
        const isPrivateEndpoint = true;
        const method = 'DELETE';
        const query = {
            symbol: symbol,
            order_uuid: orderUuid
        };
        return this.parent.signAndSend(url, query, method, isPrivateEndpoint);
    }
    async cancelAllOrders(symbol = "") {
        const url = '/v1/private/order/cancel_all';
        const isPrivateEndpoint = true;
        const method = 'DELETE';
        const query = {
            symbol: symbol
        };
        return this.parent.signAndSend(url, query, method, isPrivateEndpoint);
    }
}
module.exports = Ariomex;
