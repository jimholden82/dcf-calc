const priceInput = document.getElementById('price');
const fcfInput = document.getElementById('fcf');
const growthInput = document.getElementById('growth');
const yearsInput = document.getElementById('years');
const exitYieldInput = document.getElementById('exitYield');
const resultEl = document.getElementById('result');
const futureFcfEl = document.getElementById('futureFcf');
const futurePriceEl = document.getElementById('futurePrice');

function calculate() {
    const price = parseFloat(priceInput.value);
    const fcf = parseFloat(fcfInput.value);
    const growth = parseFloat(growthInput.value) / 100;
    const years = parseInt(yearsInput.value);
    const exitYield = parseFloat(exitYieldInput.value) / 100;

    // Check if all inputs are valid
    if (isNaN(fcf) || isNaN(growth) || isNaN(years) || isNaN(exitYield) || isNaN(price)) {
        resultEl.textContent = '--%';
        resultEl.className = 'result-value';
        futureFcfEl.textContent = '--';
        futurePriceEl.textContent = '--';
        return;
    }

    if (years < 1 || price <= 0 || exitYield <= 0) {
        resultEl.textContent = '--%';
        resultEl.className = 'result-value';
        futureFcfEl.textContent = '--';
        futurePriceEl.textContent = '--';
        return;
    }

    // Calculate future FCF
    const futureFcf = fcf * Math.pow(1 + growth, years);

    // Calculate future price (FCF / Yield = Price)
    const futurePrice = futureFcf / exitYield;

    // Calculate CAGR (implied return)
    const cagr = Math.pow(futurePrice / price, 1 / years) - 1;
    const cagrPercent = cagr * 100;

    // Update display
    futureFcfEl.textContent = '$' + futureFcf.toFixed(2);
    futurePriceEl.textContent = '$' + futurePrice.toFixed(2);

    resultEl.textContent = cagrPercent.toFixed(1) + '%';

    if (cagrPercent > 0) {
        resultEl.className = 'result-value positive';
    } else if (cagrPercent < 0) {
        resultEl.className = 'result-value negative';
    } else {
        resultEl.className = 'result-value';
    }
}

// Add event listeners for real-time calculation
[priceInput, fcfInput, growthInput, yearsInput, exitYieldInput].forEach(input => {
    input.addEventListener('input', calculate);
});
