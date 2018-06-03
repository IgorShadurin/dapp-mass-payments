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
        addresses.forEach(function (v, i, a) {
            var id = 'wallet-' + i;
            var labelId = id + '-label';
            addElement('wallets', 'div', labelId, walletTemplateText.replaceAll('{id}', labelId).replaceAll('{label}', v).replaceAll('{value}', sum));
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

    calculateDivideSum.onclick = onCalculateDivideSum;
    calculateEachPayment.onclick = onCalculateEachPayment;
});

