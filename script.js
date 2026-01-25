// ========================
// Tool Navigation
// ========================
const navTabs = document.querySelectorAll('.nav__tab');
const tools = document.querySelectorAll('.tool');

navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const toolId = tab.dataset.tool + '-tool';

        // Update tabs
        navTabs.forEach(t => t.classList.remove('is-active'));
        tab.classList.add('is-active');

        // Update tool visibility
        tools.forEach(tool => {
            tool.classList.remove('is-active');
            if (tool.id === toolId) {
                tool.classList.add('is-active');
            }
        });

        // Initialize dividend chart when switching to that tab
        if (tab.dataset.tool === 'dividend' && !dividendChart) {
            initDividendChart();
            calculateDividend();
        }
    });
});

// ========================
// DCF Calculator
// ========================
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
        resultEl.classList.remove('is-positive', 'is-negative');
        futureFcfEl.textContent = '--';
        futurePriceEl.textContent = '--';
        return;
    }

    if (years < 1 || price <= 0 || exitYield <= 0) {
        resultEl.textContent = '--%';
        resultEl.classList.remove('is-positive', 'is-negative');
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

    // Update color based on result
    resultEl.classList.remove('is-positive', 'is-negative');
    if (cagrPercent > 0) {
        resultEl.classList.add('is-positive');
    } else if (cagrPercent < 0) {
        resultEl.classList.add('is-negative');
    }
}

// Add event listeners for real-time calculation
[priceInput, fcfInput, growthInput, yearsInput, exitYieldInput].forEach(input => {
    input.addEventListener('input', calculate);
});

// ========================
// Dividend Yield vs Growth Calculator
// ========================

// DOM elements
const stockANameInput = document.getElementById('stockAName');
const stockAYieldSlider = document.getElementById('stockAYield');
const stockAYieldNum = document.getElementById('stockAYieldNum');
const stockAGrowthSlider = document.getElementById('stockAGrowth');
const stockAGrowthNum = document.getElementById('stockAGrowthNum');

const stockBNameInput = document.getElementById('stockBName');
const stockBYieldSlider = document.getElementById('stockBYield');
const stockBYieldNum = document.getElementById('stockBYieldNum');
const stockBGrowthSlider = document.getElementById('stockBGrowth');
const stockBGrowthNum = document.getElementById('stockBGrowthNum');

const dividendYearsSlider = document.getElementById('dividendYears');
const dividendYearsDisplay = document.getElementById('dividendYearsDisplay');

const crossoverYearEl = document.getElementById('crossoverYear');
const crossoverYieldEl = document.getElementById('crossoverYield');
const totalDividendsAEl = document.getElementById('totalDividendsA');
const totalDividendsBEl = document.getElementById('totalDividendsB');
const stockANameResult = document.getElementById('stockANameResult');
const stockBNameResult = document.getElementById('stockBNameResult');

let dividendChart = null;

// Sync slider and number inputs
function syncInputs(slider, numInput) {
    slider.addEventListener('input', () => {
        numInput.value = parseFloat(slider.value).toFixed(2);
        calculateDividend();
    });
    numInput.addEventListener('input', () => {
        let val = parseFloat(numInput.value);
        if (!isNaN(val)) {
            val = Math.max(parseFloat(slider.min), Math.min(parseFloat(slider.max), val));
            slider.value = val;
        }
        calculateDividend();
    });
    numInput.addEventListener('blur', () => {
        let val = parseFloat(numInput.value);
        if (isNaN(val)) val = parseFloat(slider.value);
        val = Math.max(parseFloat(slider.min), Math.min(parseFloat(slider.max), val));
        numInput.value = val.toFixed(2);
        slider.value = val;
        calculateDividend();
    });
}

syncInputs(stockAYieldSlider, stockAYieldNum);
syncInputs(stockAGrowthSlider, stockAGrowthNum);
syncInputs(stockBYieldSlider, stockBYieldNum);
syncInputs(stockBGrowthSlider, stockBGrowthNum);

// Years slider
dividendYearsSlider.addEventListener('input', () => {
    dividendYearsDisplay.textContent = dividendYearsSlider.value;
    calculateDividend();
});

// Stock name inputs
stockANameInput.addEventListener('input', () => {
    stockANameResult.textContent = stockANameInput.value || 'Stock A';
    calculateDividend();
});

stockBNameInput.addEventListener('input', () => {
    stockBNameResult.textContent = stockBNameInput.value || 'Stock B';
    calculateDividend();
});

function initDividendChart() {
    const ctx = document.getElementById('dividendChart').getContext('2d');
    dividendChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: stockANameInput.value,
                    data: [],
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 2,
                    pointRadius: 0,
                    tension: 0.1
                },
                {
                    label: stockBNameInput.value,
                    data: [],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 2,
                    pointRadius: 0,
                    tension: 0.1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y.toFixed(2) + '%';
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Years'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Yield on Cost (%)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}

function calculateDividend() {
    const yieldA = parseFloat(stockAYieldSlider.value) / 100;
    const growthA = parseFloat(stockAGrowthSlider.value) / 100;
    const yieldB = parseFloat(stockBYieldSlider.value) / 100;
    const growthB = parseFloat(stockBGrowthSlider.value) / 100;
    const years = parseInt(dividendYearsSlider.value);

    // Calculate crossover year
    let crossoverYear = null;
    let crossoverYield = null;

    if (growthB > growthA && yieldA > yieldB) {
        crossoverYear = Math.log(yieldA / yieldB) / Math.log((1 + growthB) / (1 + growthA));
        crossoverYield = yieldB * Math.pow(1 + growthB, crossoverYear) * 100;
    } else if (growthA > growthB && yieldB > yieldA) {
        crossoverYear = Math.log(yieldB / yieldA) / Math.log((1 + growthA) / (1 + growthB));
        crossoverYield = yieldA * Math.pow(1 + growthA, crossoverYear) * 100;
    }

    // Update crossover display
    if (crossoverYear !== null && crossoverYear > 0 && crossoverYear <= 100) {
        crossoverYearEl.textContent = 'Year ' + crossoverYear.toFixed(1);
        crossoverYieldEl.textContent = 'at ' + crossoverYield.toFixed(2) + '% yield';
    } else {
        crossoverYearEl.textContent = 'No crossover';
        crossoverYieldEl.textContent = '';
    }

    // Calculate total dividends
    let totalA = 0;
    let totalB = 0;
    const dataA = [];
    const dataB = [];
    const labels = [];

    for (let year = 0; year <= years; year++) {
        const yocA = yieldA * Math.pow(1 + growthA, year) * 100;
        const yocB = yieldB * Math.pow(1 + growthB, year) * 100;

        dataA.push(parseFloat(yocA.toFixed(2)));
        dataB.push(parseFloat(yocB.toFixed(2)));
        labels.push(year);

        if (year < years) {
            totalA += yieldA * Math.pow(1 + growthA, year);
            totalB += yieldB * Math.pow(1 + growthB, year);
        }
    }

    totalDividendsAEl.textContent = (totalA * 100).toFixed(1) + '%';
    totalDividendsBEl.textContent = (totalB * 100).toFixed(1) + '%';

    // Update chart
    if (dividendChart) {
        dividendChart.data.labels = labels;
        dividendChart.data.datasets[0].label = stockANameInput.value || 'Stock A';
        dividendChart.data.datasets[0].data = dataA;
        dividendChart.data.datasets[1].label = stockBNameInput.value || 'Stock B';
        dividendChart.data.datasets[1].data = dataB;
        dividendChart.update();
    }
}
