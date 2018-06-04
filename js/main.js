var NebPay = require("nebpay");
var nebPay = new NebPay();
var nebulas = require("nebulas");
var neb = new this.nebulas.Neb();
// testnet
//var contractAddress = "n1mQHZN3VNufwBjiAYmGKuZB3oBndaqPtQv";
var contractAddress = "n1jBkQRaSmHD2b1E8A7z9E9Ar8v59HqBxMY";


function showCalculation() {
    var addresses = document.getElementById("addresses");
    addresses = addresses.value.trim().split("\n");
    var count = 0;
    addresses.forEach(function (v) {
        if (v.trim()) {
            count++;
        }
    });

    if (count > 0) {
        var element = document.getElementById("calculation");
        element.classList.remove("d-lg-none");
    } else {
        throw new Error('Please enter addresses list');
    }

    return addresses;
}

function onCalculateDivideSum() {
    try {
        var sum = document.getElementById("divideSum").value;
        if (!sum) {
            alert('Sum can not be empty');

            return;
        }

        var addresses = showCalculation();
        var walletsDiv = document.getElementById('wallets');
        walletsDiv.innerHTML = "";
        var walletTemplateText = document.getElementById("wallet-template").innerHTML;
        var resultSum = sum / addresses.length;
        var depositBalanceButton = document.querySelector('#depositBalance');
        var massSendBalanceButton = document.querySelector('#massSendBalance');
        depositBalanceButton.dataset.sum = sum;
        massSendBalanceButton.dataset.addresses = JSON.stringify(addresses);
        addresses.forEach(function (v, i, a) {
            var id = 'wallet-' + i;
            var labelId = id + '-label';
            addElement('wallets', 'div', labelId, walletTemplateText.replaceAll('{id}', labelId).replaceAll('{label}', v).replaceAll('{value}', resultSum));
        });
    } catch (ex) {
        alert(ex.message);
    }
}

function onCalculateEachPayment() {
    try {
        var sum = document.getElementById("calculateEachPayment").value;
        if (!sum) {
            alert('Sum can not be empty');

            return;
        }

        var addresses = showCalculation();

        // todo create elements
    } catch (ex) {
        alert(ex.message);

    }
}

function onDeposit() {
    var depositBalanceButton = document.querySelector('#depositBalance');
    var sum = depositBalanceButton.dataset.sum;
    //console.log(sum);
    nebPay.call(contractAddress, sum, "deposit", null, {
        listener: function (r) {
            // todo
            //r.txhash
            //console.log(r);
            alert('Your transaction is ' + r.txhash + '. Wait when mining complete (30-60 seconds) and press Pay to all')
        }
    });
}

function onMassSend() {
    var massSendBalanceButton = document.querySelector('#massSendBalance');
    var addresses = massSendBalanceButton.dataset.addresses;
    var depositBalanceButton = document.querySelector('#depositBalance');
    var sum = depositBalanceButton.dataset.sum.toString();
    //console.log(typeof(sum));
    sum = neb.toBasic(sum, 'nas').dividedBy(JSON.parse(addresses).length).toFixed(0).toString();
    //console.log(sum);
    var params = [
        addresses,
        sum
    ];
    nebPay.call(contractAddress, 0, "payToAll", JSON.stringify(params), {
        listener: function (r) {
            // todo
            console.log(r);
            alert('Now your transaction in mining: ' + r.txhash);
        }
    });
}

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function addElement(parentId, elementTag, elementId, html) {
    var p = document.getElementById(parentId);
    var newElement = document.createElement(elementTag);
    newElement.setAttribute('id', elementId);
    newElement.innerHTML = html;
    p.appendChild(newElement);
}

document.addEventListener('DOMContentLoaded', function () {
    if (typeof(webExtensionWallet) === "undefined") {
        alert("Extension wallet is not installed, please install it first.")
    }

    document.querySelector('#calculateDivideSum').onclick = onCalculateDivideSum;
    //document.querySelector('#calculateEachPayment').onclick = onCalculateEachPayment;
    document.querySelector('#depositBalance').onclick = onDeposit;
    document.querySelector('#massSendBalance').onclick = onMassSend;
});

