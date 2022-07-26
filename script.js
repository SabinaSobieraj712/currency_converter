const amountInput = document.querySelector("#amount-input");
const selectDOM = document.querySelector("#select-dom");
const submitBtn = document.querySelector("#submit-btn");
const resultSpanDOM = document.querySelector(".sum");

const currencyUrl = "http://api.nbp.pl/api/exchangerates/tables/a/";
const calculatedCurrencyMessage = " PLN";
const errorMessage = "Wystąpił błąd: ";
let currencies = ["EUR", "USD", "CHF"];
let actualRate;
const scale = 2;

function getCurrencyList() {
	fetch(currencyUrl)
		.then((response) => {return response.json();})
		.then((data) => {
			
			selectDOM.addEventListener("change", (event) => {
				currencySelection(event, data, submitBtn)
			});

			currencies.forEach((element) => {
				createOptionElement(selectDOM, element);
			});
		})
		.catch((err) => console.log(errorMessage + err));
}

getCurrencyList();


function currencySelection(event, data, submitBtn) {
	let chooseCurrency = data[0].rates.filter((rate) => {
		return rate.code === event.target.value;
	});
	actualRate = chooseCurrency[0].mid;
	submitBtn.addEventListener("click", exchangeCurrency);
}

function getRoundToTwo(num) {
	return +(Math.round(num + "e+" + scale)  + "e-" + scale);
}

function exchangeCurrency(element) {
	element.preventDefault();
	if (amountInput.value > 0) {
		let result = amountInput.value * actualRate;
		resultSpanDOM.innerText = getRoundToTwo(result) + calculatedCurrencyMessage;
	}
}

function createOptionElement(selectDOM, element) {
	let option = document.createElement("option");
	option.textContent = element;
	selectDOM.appendChild(option);
}