
const amountInput = document.querySelector(".amnt_inp");

const fromCurrency = document.querySelector(".from");

const toCurrency = document.querySelector(".to");

const fromFlag = document.querySelector(".from-flag");

const toFlag = document.querySelector(".to-flag");

const convertBtn = document.querySelector(".convert-btn");

const swapBtn = document.querySelector(".swap-btn");

const result = document.querySelector(".result");


const countryCodes = {
    AED: "ae",
    AFN: "af",
    ALL: "al",
    AMD: "am",
    ANG: "cw",
    AOA: "ao",
    ARS: "ar",
    AUD: "au",
    AWG: "aw",
    AZN: "az",

    BAM: "ba",
    BBD: "bb",
    BDT: "bd",
    BGN: "bg",
    BHD: "bh",
    BIF: "bi",
    BMD: "bm",
    BND: "bn",
    BOB: "bo",
    BRL: "br",
    BSD: "bs",
    BTN: "bt",
    BWP: "bw",
    BYN: "by",
    BZD: "bz",

    CAD: "ca",
    CHF: "ch",
    CLP: "cl",
    CNY: "cn",
    COP: "co",
    CRC: "cr",
    CUP: "cu",
    CVE: "cv",
    CZK: "cz",

    DKK: "dk",
    DOP: "do",
    DZD: "dz",

    EGP: "eg",
    ETB: "et",
    EUR: "eu",

    GBP: "gb",
    GEL: "ge",
    GHS: "gh",
    GIP: "gi",
    GMD: "gm",
    GNF: "gn",
    GTQ: "gt",
    GYD: "gy",

    HKD: "hk",
    HNL: "hn",
    HRK: "hr",
    HTG: "ht",
    HUF: "hu",

    IDR: "id",
    ILS: "il",
    INR: "in",
    IQD: "iq",
    IRR: "ir",
    ISK: "is",

    JMD: "jm",
    JOD: "jo",
    JPY: "jp",

    KES: "ke",
    KGS: "kg",
    KHR: "kh",
    KMF: "km",
    KPW: "kp",
    KRW: "kr",
    KWD: "kw",
    KZT: "kz",

    LAK: "la",
    LBP: "lb",
    LKR: "lk",
    LRD: "lr",
    LSL: "ls",
    LYD: "ly",

    MAD: "ma",
    MDL: "md",
    MGA: "mg",
    MKD: "mk",
    MMK: "mm",
    MNT: "mn",
    MOP: "mo",
    MRU: "mr",
    MUR: "mu",
    MVR: "mv",
    MWK: "mw",
    MXN: "mx",
    MYR: "my",
    MZN: "mz",

    NAD: "na",
    NGN: "ng",
    NIO: "ni",
    NOK: "no",
    NPR: "np",
    NZD: "nz",

    OMR: "om",

    PAB: "pa",
    PEN: "pe",
    PGK: "pg",
    PHP: "ph",
    PKR: "pk",
    PLN: "pl",
    PYG: "py",

    QAR: "qa",

    RON: "ro",
    RSD: "rs",
    RUB: "ru",
    RWF: "rw",

    SAR: "sa",
    SBD: "sb",
    SCR: "sc",
    SDG: "sd",
    SEK: "se",
    SGD: "sg",
    SLL: "sl",
    SOS: "so",
    SRD: "sr",
    SSP: "ss",
    STN: "st",
    SYP: "sy",

    THB: "th",
    TJS: "tj",
    TMT: "tm",
    TND: "tn",
    TOP: "to",
    TRY: "tr",
    TTD: "tt",
    TWD: "tw",
    TZS: "tz",

    UAH: "ua",
    UGX: "ug",
    USD: "us",
    UYU: "uy",
    UZS: "uz",

    VES: "ve",
    VND: "vn",
    VUV: "vu",

    WST: "ws",

    XAF: "cm",
    XCD: "dm",
    XPF: "pf",

    YER: "ye",
    ZAR: "za",
    ZMW: "zm",
    ZWL: "zw"
};

function updateFlag(select, flag) {

    const currencyCode = select.value;

    const countryCode = countryCodes[currencyCode];

    if (countryCode) {
        flag.src = `https://flagcdn.com/w40/${countryCode}.png`;
    }
}


fromCurrency.addEventListener("change", function() {

    updateFlag(fromCurrency, fromFlag);

});


toCurrency.addEventListener("change", function() {

    updateFlag(toCurrency, toFlag);

});



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
        updateFlag(fromCurrency, fromFlag);
        updateFlag(toCurrency, toFlag);

    });


convertBtn.addEventListener("click", function() {
    const amount = Number(amountInput.value);

    if(amount<=0){
        result.textContent = `Please enter a valid amount`;
        return;
    }
    if(fromCurrency.value === toCurrency.value){
        result.textContent = `Please select different currency `;
        return;
    }

    result.textContent = "Converting...";

    convertBtn.textContent = "Converting...";

    convertBtn.style.pointerEvents = "none";

    // .....Currency converter Api....
    fetch(`https://api.frankfurter.dev/v2/rate/${fromCurrency.value}/${toCurrency.value}`)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        const rate = data.rate;

        const convertedAmount = amount*rate;
        
        result.textContent = `${amount} ${fromCurrency.value} = ${convertedAmount.toFixed(2)} ${toCurrency.value}`;
            
        convertBtn.textContent = "Convert it!";

        convertBtn.style.pointerEvents = "auto";
    })
       .catch(function(error) {

        console.log(error);

        result.textContent =
            "Unable to fetch exchange rate. Please try again.";

        convertBtn.textContent = "Convert it!";
        convertBtn.style.pointerEvents = "auto";

    });
});



swapBtn.addEventListener("click", function() {

    const fromValue = fromCurrency.value;

    fromCurrency.value = toCurrency.value;

    toCurrency.value = fromValue;

    updateFlag(fromCurrency, fromFlag);
    updateFlag(toCurrency, toFlag);
});