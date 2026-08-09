
const amountInput = document.querySelector(".amnt_inp");

const fromCurrency = document.querySelector(".from");

const toCurrency = document.querySelector(".to");

const convertBtn = document.querySelector(".convert-btn");

const result = document.querySelector(".result");


  // .....Currency code and name Api...
  function addCurrency(select, currency) {

    const option = document.createElement("option");

    option.value = currency.iso_code;
    option.textContent = currency.name;

    select.appendChild(option);
}

    fetch("https://api.frankfurter.dev/v2/currencies")
    .then(function(response) {
        return response.json();
    })

    .then(function(data) {

        data.forEach(function(currency){
           addCurrency(fromCurrency, currency);

            addCurrency(toCurrency, currency);
        })
    });


convertBtn.addEventListener("click", function() {
    const amount = Number(amountInput.value);

    if(amount<=0){
        result.textContent = `Please enter a valid amount`;
        return;
    }
    else if(fromCurrency.value === toCurrency.value){
        result.textContent = `Please select different currency `;
        return;
    }
    // .....Currency converter Api....
    fetch(`https://api.frankfurter.dev/v2/rate/${fromCurrency.value}/${toCurrency.value}`)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        const rate = data.rate;

        const convertedAmount = amount*rate;
        
        result.textContent = `${amount} ${fromCurrency.value} = ${convertedAmount.toFixed(2)} ${toCurrency.value}`;
            
    });
})