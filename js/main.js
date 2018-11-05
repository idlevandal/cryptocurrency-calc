// create an object of the input values
function getInputValues() {
  return {
    numCoins: document.querySelector(".input__number-of-coins").value,
    pricePerCoin: document.querySelector(".input__buy-price").value,
    buyCommission: document.querySelector(".input__buy-commission").value,
    sellPerCoin: document.querySelector(".input__sell-price").value,
    sellCommission: document.querySelector(".input__sell-commission").value
  };
}

// clear the input fields and remove 'results' div from the DOM
function clearInputValues() {
  let inputs = document.querySelectorAll(".inp");

  let inputsArr = Array.from(inputs);

  inputsArr.forEach(e => (e.value = ""));

  inputs[0].focus();

  // remove the results html from the DOM
  const results = document.querySelector(".results");
  if (results) {
    results.parentNode.removeChild(results);
  }
}

// calculate commission for % based commission
function calcCommision(numCoins, pricePerCoin, commission) {
  return numCoins * pricePerCoin * (commission / 100);
}

function financial(x) {
  return Number.parseFloat(x).toFixed(2);
}

// add thousand seperators to values eg 0,000,000
function addCommas(nStr) {
  let x, x1, x2;
  nStr += "";
  x = nStr.split(".");
  x1 = x[0];
  x2 = x.length > 1 ? "." + x[1] : "";
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, "$1" + "," + "$2");
  }
  return x1 + x2;
}

// Change the placeholder text based on commission type eg % or fixed price
function changeCommissionType() {
  let commissionType = document.querySelector(".input__commission-type").value;

  if (commissionType === "percentage") {
    document.querySelector(".input__buy-commission").placeholder =
      "Buy commission (%)";
    document.querySelector(".input__sell-commission").placeholder =
      "Sell commission (%)";
  } else if (commissionType === "fixed") {
    document.querySelector(".input__buy-commission").placeholder =
      "Buy commission fixed ($)";
    document.querySelector(".input__sell-commission").placeholder =
      "Sell commission fixed ($)";
  }
}

// Display the results to the DOM
function displayResults(resultsData) {
  const displayRed = resultsData.profitLoss === "Loss" ? " red" : "";

  // check if there is already data in results, if there is remove it....
  const results = document.querySelector(".results");
  if (results) {
    results.parentNode.removeChild(results);
  }

  const html = `
        <div class="results animated bounceInDown">
            <h2 class="h2">Results</h2>
            <p class="par">Number of coins:<span>${
              resultsData.numCoins
            }</span></p>
            <p class="par">Total buy price:<span>$${addCommas(
              resultsData.buyPrice
            )}</span></p>
            <p class="par">Total sell price:<span>$${addCommas(
              resultsData.sellPrice
            )}</span></p>
            <p class="par">Total commission:<span>$${addCommas(
              resultsData.totalComm
            )}</span></p>
            <p class="par${displayRed}">Net ${
    resultsData.profitLoss
  }:<span>$${addCommas(resultsData.net)}</span></p>
            <p class="par${displayRed}">Percentage ${
    resultsData.profitLoss
  }:<span>${resultsData.percProfitLoss}%</span></p>
        </div>`;

  document.querySelector(".output").insertAdjacentHTML("afterbegin", html);
}

// removes focus from the 'calculate' & 'clear' btns when enter is pressed so as to remove
// css box shadow etc so it doesn't look like the btn is still selected..

// document.addEventListener("keypress", event => {
//   if (event.keyCode === 13 || event.which === 13) {
//     document.querySelector(".input__number-of-coins").focus();
//   }
// });

// EVENT to listen for changes on commission selector eg. % or $
const inputCommissionType = document.querySelector(".input__commission-type");
inputCommissionType.addEventListener("change", changeCommissionType);

// EVENT to listen to clear button and call clearInputValues method
document
  .querySelector(".input__btn--clear")
  .addEventListener("click", clearInputValues);

// call methods to get data, calculate data and display data
document.querySelector(".input__btn--calc").addEventListener("click", e => {
  const inputData = getInputValues();

  // get commission value % or $
  let commType = inputCommissionType.value;

  let buyCommission, sellCommission;
  if (commType === "percentage") {
    buyCommission = calcCommision(
      inputData.numCoins,
      inputData.pricePerCoin,
      inputData.buyCommission
    );
    sellCommission = calcCommision(
      inputData.numCoins,
      inputData.sellPerCoin,
      inputData.sellCommission
    );
  } else {
    buyCommission = inputData.buyCommission;
    sellCommission = inputData.sellCommission;
  }

  let totalCommission = parseFloat(buyCommission) + parseFloat(sellCommission);

  let buyPrice = inputData.numCoins * inputData.pricePerCoin;
  let sellPrice = inputData.numCoins * inputData.sellPerCoin;
  let gross = sellPrice - buyPrice;
  let net = gross - totalCommission;

  let percProfitLoss = Math.abs((net / buyPrice) * 100);
  percProfitLoss = Math.round(percProfitLoss * 100) / 100;

  const profitLoss = net >= 0 ? "Profit" : "Loss";

  const resultsData = {
    numCoins: inputData.numCoins,
    buyPrice: financial(buyPrice),
    sellPrice: financial(sellPrice),
    totalComm: financial(totalCommission),
    net: financial(Math.abs(net)),
    percProfitLoss: percProfitLoss,
    profitLoss: profitLoss
  };

  // move the window down on small screens to display results when user
  // hits calculate button
  const vpWidth = window.innerWidth;
  if (vpWidth < 801) {
    window.scrollBy({
      top: 500, // could be negative value
      left: 0,
      behavior: "smooth"
    });
  }

  displayResults(resultsData);

  // remove focus from button when clicked
  e.target.blur();
});

console.log("App has started...");
