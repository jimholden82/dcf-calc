# Investing Tools

A collection of simple investing calculators for estimating returns and comparing strategies.

**Live Demo**: https://jimholden82.github.io/dcf-calc/

## Tools

### DCF Calculator

Estimate implied investment returns using discounted cash flow analysis.

**Inputs:**
- **Current Share Price** — The stock's current market price
- **Current FCF per Share** — Free cash flow per share (trailing or forward)
- **Annual Growth Rate** — Expected FCF growth rate per year
- **Years of Growth** — Investment time horizon
- **Exit FCF Yield** — Expected FCF yield at exit (inverse of P/FCF multiple)

**Output:**
- **Implied Annual Return (CAGR)** — Compound annual growth rate from current price to projected future price
- **Future FCF/Share** — Projected FCF after growth period
- **Future Price** — Projected share price based on exit yield

**Calculation:**
```
Future FCF = Current FCF × (1 + Growth Rate)^Years
Future Price = Future FCF / Exit Yield
CAGR = (Future Price / Current Price)^(1/Years) - 1
```

### Dividend Yield vs Growth Calculator

Compare yield-on-cost trajectories between high-yield/low-growth and low-yield/high-growth dividend strategies.

**Inputs (per stock):**
- **Initial Dividend Yield** — Starting dividend yield
- **Annual Dividend Growth** — Expected annual dividend growth rate
- **Time Horizon** — Investment period (5-50 years)

**Output:**
- **Crossover Year** — When the high-growth stock's yield-on-cost surpasses the high-yield stock
- **Total Dividends** — Cumulative dividends as percentage of initial investment
- **Yield-on-Cost Chart** — Visual comparison of trajectories over time

**Calculation:**
```
Yield on Cost (Year n) = Initial Yield × (1 + Growth Rate)^n
Crossover Year = ln(Y₁/Y₂) / ln((1+G₂)/(1+G₁))
```

## Usage

Open `index.html` in your browser or visit the live demo. Use the tabs to switch between tools. All calculations update in real-time.

## License

This project is licensed under [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) — free for non-commercial use with attribution.
