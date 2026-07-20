import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Check,
  CreditCard,
  LockKey,
  PhoneCall,
  ShieldCheck,
  ShoppingBag,
  Tag,
} from "@phosphor-icons/react";
import "./checkout.css";

const BASE_PRICE = 1999;
const GST_RATE = 0.18;
const DRAFT_KEY = "attractivemen-checkout-draft";

const BUMPS = [
  {
    id: "call",
    title: "20-Minute Style Review Call",
    price: 799,
    Icon: PhoneCall,
    summary: "Review your report privately with a style expert.",
    details: ["Personal Report Walkthrough", "Fit, Hair & Grooming Q&A", "2 Outfit Photo Reviews"],
  },
  {
    id: "shopping",
    title: "Personalized Online Shopping Kit",
    price: 699,
    Icon: ShoppingBag,
    summary: "Skip the search with a shortlist built around your budget.",
    details: ["8 to 12 Direct Product Links", "Size & Fit Notes", "Budget-Based Recommendations"],
  },
];

const formatMoney = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(amount);

function loadDraft() {
  try {
    const saved = JSON.parse(localStorage.getItem(DRAFT_KEY));
    return {
      details: saved?.details ?? { name: "", email: "", phone: "" },
      selected: Array.isArray(saved?.selected) ? saved.selected : [],
    };
  } catch {
    return { details: { name: "", email: "", phone: "" }, selected: [] };
  }
}

export function CheckoutPage() {
  const initial = useMemo(loadDraft, []);
  const [details, setDetails] = useState(initial.details);
  const [selected, setSelected] = useState(initial.selected);
  const [errors, setErrors] = useState({});
  const [consent, setConsent] = useState(false);
  const [couponOpen, setCouponOpen] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [couponMessage, setCouponMessage] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify({ details, selected }));
  }, [details, selected]);

  const selectedBumps = BUMPS.filter((bump) => selected.includes(bump.id));
  const bumpsTotal = selectedBumps.reduce((sum, bump) => sum + bump.price, 0);
  const subtotal = BASE_PRICE + bumpsTotal;
  const gst = subtotal * GST_RATE;
  const total = subtotal + gst;

  const updateDetail = (field, value) => {
    setDetails((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: "" }));
    setStatus("");
  };

  const toggleBump = (id) => {
    setSelected((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
    setStatus("");
  };

  const validate = () => {
    const next = {};
    if (details.name.trim().length < 2) next.name = "Please enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(details.email.trim())) next.email = "Please enter a valid email address.";
    if (!/^\d{10}$/.test(details.phone.replace(/\D/g, ""))) next.phone = "Please enter a valid 10-digit mobile number.";
    if (!consent) next.consent = "Please accept the policies before continuing.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) {
      setStatus("Please check the highlighted fields. Nothing has been charged.");
      return;
    }
    setStatus("Your details are ready. Connect the live Cashfree account to open secure payment here.");
  };

  const saveForLater = () => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify({ details, selected }));
    setStatus("Saved on this device. You can return to this checkout when you are ready.");
  };

  const applyCoupon = () => {
    setCouponMessage(coupon.trim() ? "This code will be verified by the live payment gateway." : "Enter a coupon code first.");
  };

  return (
    <div className="checkout-page">
      <header className="checkout-header">
        <a className="checkout-back" href="?" aria-label="Return to AttractiveMen">
          <ArrowLeft size={18} /> Back
        </a>
        <a className="checkout-brand" href="?">AttractiveMen</a>
        <span className="checkout-secure"><LockKey size={16} weight="fill" /> Secure checkout</span>
      </header>

      <main className="checkout-main">
        <section className="checkout-intro" aria-labelledby="checkout-title">
          <p className="checkout-step">Checkout &nbsp;•&nbsp; Assessment &nbsp;•&nbsp; Your report</p>
          <h1 id="checkout-title">Complete your order.<br /><span>Start dressing with certainty.</span></h1>
          <p>Your recommendations will be built around your face, body, skin tone, routine and budget.</p>
          <div className="checkout-trust-row">
            <span><Check size={16} weight="bold" /> One-Time Payment</span>
            <span><Check size={16} weight="bold" /> No Subscription</span>
            <span><Check size={16} weight="bold" /> 48-Hour Delivery</span>
          </div>
        </section>

        <form className="checkout-card" onSubmit={handleSubmit} noValidate>
          <section className="checkout-block" aria-labelledby="contact-title">
            <div className="checkout-block-heading">
              <span>1</span>
              <div><h2 id="contact-title">Where should we send your report?</h2><p>Your details are saved on this device as you type.</p></div>
            </div>

            <label className="checkout-field">
              <span>Full name</span>
              <input autoComplete="name" value={details.name} onChange={(event) => updateDetail("name", event.target.value)} placeholder="Your full name" aria-invalid={Boolean(errors.name)} />
              {errors.name ? <small>{errors.name}</small> : null}
            </label>
            <label className="checkout-field">
              <span>Email address</span>
              <input type="email" autoComplete="email" value={details.email} onChange={(event) => updateDetail("email", event.target.value)} placeholder="you@example.com" aria-invalid={Boolean(errors.email)} />
              {errors.email ? <small>{errors.email}</small> : null}
            </label>
            <label className="checkout-field">
              <span>WhatsApp number</span>
              <div className="checkout-phone"><span>+91</span><input type="tel" inputMode="numeric" autoComplete="tel" value={details.phone} onChange={(event) => updateDetail("phone", event.target.value)} placeholder="10-digit mobile number" aria-invalid={Boolean(errors.phone)} /></div>
              {errors.phone ? <small>{errors.phone}</small> : null}
            </label>
          </section>

          <section className="checkout-block" aria-labelledby="support-title">
            <div className="checkout-block-heading">
              <span>2</span>
              <div><h2 id="support-title">Add personal help only if you need it</h2><p>Every upgrade is optional and nothing is selected for you.</p></div>
            </div>

            <div className="checkout-bumps">
              {BUMPS.map(({ id, title, price, Icon, summary, details: benefits }) => {
                const isSelected = selected.includes(id);
                return (
                  <label className={`checkout-bump ${isSelected ? "selected" : ""}`} key={id}>
                    <input type="checkbox" checked={isSelected} onChange={() => toggleBump(id)} />
                    <span className="bump-check" aria-hidden="true">{isSelected ? <Check size={15} weight="bold" /> : null}</span>
                    <span className="bump-copy">
                      <span className="bump-title-row">
                        <span><Icon size={21} /><strong>{title}</strong></span>
                        <b>+{formatMoney(price)}</b>
                      </span>
                      <span className="bump-summary">{summary}</span>
                      <ul className="bump-benefits">
                        {benefits.map((benefit) => <li key={benefit}><Check size={14} weight="bold" /><span>{benefit}</span></li>)}
                      </ul>
                    </span>
                  </label>
                );
              })}
            </div>
          </section>

          <section className="checkout-block" aria-labelledby="order-title">
            <div className="checkout-block-heading">
              <span>3</span>
              <div><h2 id="order-title">Review your order</h2><p>See exactly what you are paying before continuing.</p></div>
            </div>

            <div className="checkout-product">
              <img src="/assets/product/style-report.png" alt="AttractiveMen personalized style report" />
              <div><strong>Personalized Style Report</strong><span>Built around your features</span><small>One-time purchase</small></div>
              <b>{formatMoney(BASE_PRICE)}</b>
            </div>

            {selectedBumps.length ? (
              <div className="checkout-selected-items">
                {selectedBumps.map((bump) => <div key={bump.id}><span>{bump.title}</span><b>+{formatMoney(bump.price)}</b></div>)}
              </div>
            ) : null}

            <div className="checkout-totals">
              <div><span>Subtotal</span><b>{formatMoney(subtotal)}</b></div>
              <div><span>GST (18%)</span><b>{formatMoney(gst)}</b></div>
              <div className="checkout-total"><span>Total payable</span><strong>{formatMoney(total)}</strong></div>
            </div>
          </section>

          <section className="checkout-block checkout-payment" aria-labelledby="payment-title">
            <div className="checkout-block-heading">
              <span>4</span>
              <div><h2 id="payment-title">Pay securely</h2><p>Your payment details are handled by the payment gateway.</p></div>
            </div>

            <label className="payment-provider">
              <input type="radio" name="provider" defaultChecked />
              <CreditCard size={24} />
              <span><strong>Cashfree Payments</strong><small>UPI, cards, netbanking and wallets</small></span>
              <ShieldCheck size={27} weight="fill" />
            </label>

            <label className="checkout-consent">
              <input type="checkbox" checked={consent} onChange={(event) => { setConsent(event.target.checked); setErrors((current) => ({ ...current, consent: "" })); }} />
              <span>I agree to the Privacy Policy, Terms of Service and Refund Policy.</span>
            </label>
            {errors.consent ? <small className="checkout-error">{errors.consent}</small> : null}

            <button className="checkout-pay" type="submit"><LockKey size={20} weight="fill" /> Proceed to secure payment • {formatMoney(total)}</button>
            <button className="checkout-save" type="button" onClick={saveForLater}>Need time? Save and finish later</button>
            {status ? <p className="checkout-status" role="status">{status}</p> : null}

            <div className="checkout-coupon">
              <button type="button" onClick={() => setCouponOpen((open) => !open)}><Tag size={17} /> Have a coupon code?</button>
              {couponOpen ? <div><input value={coupon} onChange={(event) => setCoupon(event.target.value)} placeholder="Coupon code" /><button type="button" onClick={applyCoupon}>Apply</button></div> : null}
              {couponMessage ? <small>{couponMessage}</small> : null}
            </div>

            <div className="payment-confidence">
              <span><ShieldCheck size={18} weight="fill" /> Secure Payment</span>
              <span><LockKey size={18} weight="fill" /> Encrypted Payment Details</span>
            </div>
          </section>
        </form>

        <section className="checkout-reassurance">
          <img src="/assets/product/attractivemen-style-report-mockup-v2.png" alt="Preview of the AttractiveMen Personalized Style Report" />
          <div>
            <p>Everything you need to stop guessing</p>
            <h2>The AttractiveMen Personalized Style Report</h2>
            <strong>₹1,999 + GST</strong>
            <ul>
              <li><Check size={17} weight="bold" /> Face, Body & Skin Tone Analysis</li>
              <li><Check size={17} weight="bold" /> 20 Head-to-Toe Outfits</li>
              <li><Check size={17} weight="bold" /> Hair, Beard & Accessories Guide</li>
            </ul>
          </div>
        </section>

        <section className="checkout-next">
          <h2>What happens after payment?</h2>
          <div><span><b>1</b> 6 to 8-Minute Assessment</span><span><b>2</b> Expert Personal Analysis</span><span><b>3</b> Report Delivery Within 48 Hours</span></div>
        </section>
      </main>

      <footer className="checkout-footer">
        <a className="checkout-brand" href="?">AttractiveMen</a>
        <p>Personal style guidance made for Indian men. Individual results vary.</p>
        <nav><a href="#privacy">Privacy Policy</a><a href="#terms">Terms of Service</a><a href="#refund">Refund Policy</a><a href="#support">Contact</a></nav>
        <small>© 2026 AttractiveMen. All rights reserved.</small>
      </footer>
    </div>
  );
}
