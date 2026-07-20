# AttractiveMen Website

A responsive React and Vite sales page for the AttractiveMen Personalized Style Report, including a conversion-focused checkout prototype with optional order bumps.

## Features

- Responsive landing page for desktop and mobile
- Personalized style report offer at INR 1,999 plus GST
- Local before-and-after, report, process and testimonial imagery
- Checkout form with saved progress
- Optional style-review call and online shopping kit
- Live subtotal, GST and payable-total calculations
- Standalone downloadable HTML build

## Development

```bash
npm install
npm run dev
```

Open the local URL shown by Vite. The checkout is available at:

```text
/?page=checkout
```

## Production build

```bash
npm run build
```

The production files are written to `dist/`.

## Standalone HTML

After building the project, generate the self-contained offline file with:

```powershell
./scripts/build-standalone.ps1
```

This creates `AttractiveMen.html` in the project root.

## Payment integration

The current Cashfree section is a frontend prototype. A live Cashfree account, secure backend order creation, payment verification and webhook handling are still required before accepting payments.

The checkout currently calculates GST at 18%. Confirm the applicable tax rate before launch.