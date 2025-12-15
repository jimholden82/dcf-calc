# DCF Calculator

A simple discounted cash flow calculator to estimate implied investment returns.

**Live Demo**: https://jimholden82.github.io/dcf-calc/

## Usage

Open `index.html` in your browser. Enter your inputs and the implied annual return (CAGR) will calculate in real-time.

### Inputs

- **Current Share Price** — The stock's current market price
- **Current FCF per Share** — Free cash flow per share (trailing or forward)
- **Annual Growth Rate** — Expected FCF growth rate per year
- **Years of Growth** — Investment time horizon
- **Exit FCF Yield** — Expected FCF yield at exit (inverse of P/FCF multiple)

### Output

- **Implied Annual Return (CAGR)** — Compound annual growth rate from current price to projected future price
- **Future FCF/Share** — Projected FCF after growth period
- **Future Price** — Projected share price based on exit yield

## Calculation

```
Future FCF = Current FCF × (1 + Growth Rate)^Years
Future Price = Future FCF / Exit Yield
CAGR = (Future Price / Current Price)^(1/Years) - 1
```

## License

This project is licensed under [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) — free for non-commercial use with attribution.
