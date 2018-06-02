function showCalculation() {
    var addresses = document.getElementById("addresses");
    addresses = addresses.value.trim().split("\n");
    var count = 0;
    addresses.forEach(function (v) {
        if (v.trim() != "") {
            count++;
        }
    });

    if (count > 0) {
        var element = document.getElementById("calculation");
        element.classList.remove("d-lg-none");
    } else {
        alert('Please enter addresses list');
    }
}

function onCalculateDivideSum() {
    showCalculation();
    var sum = document.getElementById("divideSum");

}

function onCalculateEachPayment() {
    showCalculation();
    var sum = document.getElementById("calculateEachPayment");

}

document.addEventListener('DOMContentLoaded', function () {
    if (typeof(webExtensionWallet) === "undefined") {
        alert("Extension wallet is not installed, please install it first.")
    }

    calculateDivideSum.onclick = onCalculateDivideSum;
    calculateEachPayment.onclick = onCalculateEachPayment;
});

