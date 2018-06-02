"use strict";

var Game = function () {

};

Game.prototype = {
    init: function () {

    },

    deposit: function () {
        var from = Blockchain.transaction.from;
        var value = Blockchain.transaction.value;
        var balance = LocalContractStorage.get(from);
        if (balance) {
            value = value.plus(balance);
        }

        LocalContractStorage.set(from, value);
    },

    payToAll: function (addresses, amount) {
        addresses = JSON.parse(addresses);
        if (!addresses || addresses.length == 0) {
            throw new Error("Empty addresses");
        }

        var from = Blockchain.transaction.from;
        var balance = LocalContractStorage.get(from);
        if (!balance) {
            throw new Error("Not enough balance");
        }

        amount = new BigNumber(amount);
        var sum = addresses.length * amount;
        if (balance < sum) {
            throw new Error("Not enough balance for: " + sum);
        }

        addresses.forEach(function (v) {
            if (!Blockchain.verifyAddress(v)) {
                throw new Error("Incorrect address " + v);
            }

            var result = Blockchain.transfer(v, amount);
            if (!result) {
                throw new Error("Transfer failed for " + v + " with amount " + amount);
            }
        });

        return 'ok';
    }
};
module.exports = Game;