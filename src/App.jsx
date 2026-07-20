import { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  CaretDown,
  Check,
  ShieldCheck,
  Star,
  StarHalf,
  X,
} from "@phosphor-icons/react";
import {
  comparisonRows,
  faqs,
  processSteps,
  reportItems,
  testimonials,
} from "./data.js";

const CHECKOUT_TARGET = "?page=checkout";

function Brand() {
  return (
    <a className="brand" href="#top" aria-label="AttractiveMen home">
      AttractiveMen
    </a>
  );
}

function Button({ children = "Get Your Personalized Report Now", light = false, className = "" }) {
  return (
    <a className={`button ${light ? "button-light" : ""} ${className}`} href={CHECKOUT_TARGET}>
      <span>{children}</span>
      <ArrowRight size={20} weight="regular" aria-hidden="true" />
    </a>
  );
}

function Header() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Brand />
        <nav aria-label="Primary navigation">
          <a href="#inside">What’s inside</a>
          <a href="#process">How it works</a>
          <a href="#faq">FAQ</a>
        </nav>
        <a className="header-cta" href={CHECKOUT_TARGET}>
          Start my report
        </a>
      </div>
    </header>
  );
}

function SectionHeading({ index, eyebrow, children, intro, align = "center", id }) {
  return (
    <div className={`section-heading section-heading-${align}`} id={id}>
      <h2>{children}</h2>
      {intro ? <p className="section-intro">{intro}</p> : null}
    </div>
  );
}

function BeforeAfterSlider() {
  return (
    <div className="before-after" aria-label="Before and after style comparison">
      <img
        className="comparison-composite"
        src="/assets/hero/before-after-square.png"
        alt="Before and after styling transformation with grooming and fit improvements"
      />
      <div className="comparison-separator" aria-hidden="true" />
      <div className="compare-label label-before">Before</div>
      <div className="compare-label label-after">After</div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="shell hero-shell">
        <div className="hero-copy">
          <Brand />
          <h1>
            <strong className="hero-title-primary">Look Your Best<br />Version...</strong> <span><span className="hero-nowrap">Without Expensive</span><br />Brand...</span>
          </h1>
          <div className="hero-subheading-card">
            <h2>Random fashion Reel and YouTube videos make you look average</h2>
          </div>
          <p>
            The advice is not built for your <strong>face shape</strong>, <strong>body type</strong>, and <strong>skin tone</strong>.
          </p>
          <p>
            Time to get your <em>personalized style</em> that covers <em>head-to-toe transformation</em> including <em>best hair style</em> for your <strong>face shape</strong>, <em>best colors and fit</em> for your <strong>body type</strong> and <strong>skin tone</strong>, and <em>best shoes and accessories</em> that compliments your look without spending money on expensive clothes and accessories.
          </p>
        </div>
        <div className="hero-visual">
          <BeforeAfterSlider />
          <Button />
          <div className="rating-line" aria-label="Rated 4.9 out of 5 by more than 1,119 Indian men">
            <span className="rating-stars" aria-hidden="true">
              {Array.from({ length: 4 }).map((_, index) => (
                <Star key={index} size={22} weight="fill" />
              ))}
              <StarHalf size={22} weight="fill" />
            </span>
            <span><strong>4.9/5</strong> from 1,119+ Indian men who stopped guessing</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProblemSection() {
  return (
    <section className="section section-cool problem" id="problem">
      <div className="shell narrow-shell">
        <SectionHeading index="02" eyebrow="The problem">
          Here’s why Reel and YouTube styling advice makes you <span>look average</span>
        </SectionHeading>
        <p className="problem-opening">
          You open any style Reel and the advice says “wear this jacket”, “get this haircut”, “try this colour”. So you try it. And it looks… fine. But, <strong>honestly</strong>, not the version of yourself you were hoping to see in the mirror.
        </p>
        <figure className="problem-visual">
          <img src="/assets/problem/reel-vs-real.webp" alt="The same outfit looking suitable in a Reel but poorly fitted in real life" />
        </figure>
        <div className="problem-rhythm" aria-label="The common styling cycle">
          <p>You see a haircut, shirt, or colour online.</p>
          <span aria-hidden="true" />
          <p>You try it.</p>
          <span aria-hidden="true" />
          <p>But it still does not look right on you.</p>
        </div>
        <p className="problem-explanation">
          That is because most style advice is <strong>made for everyone</strong>, not for <em>your face, body, or skin tone</em>.
        </p>
        <div className="problem-consequences">
          <p>A popular haircut may <strong>hide your jawline.</strong></p>
          <p>A trending colour may <strong>make your skin look dull.</strong></p>
          <p>A “must-have” outfit may make you look <strong>shorter or heavier.</strong></p>
        </div>
        <p className="problem-spend">So you keep spending money, but still feel unsure in front of the mirror.</p>
        <div className="problem-close">
          <h3>You do not need more trends.<br /><span>You need advice made for you.</span></h3>
          <p>Until now, this kind of personal advice usually came from an expensive stylist.</p>
          <p className="strike-price">And one session could cost <s>₹10,000 or more.</s></p>
          <strong className="until-now">Until now.</strong>
        </div>
      </div>
    </section>
  );
}

function ApproachSection() {
  return (
    <section className="section approach" id="approach">
      <div className="shell approach-shell">
        <SectionHeading index="03" eyebrow="Our approach">
          We reverse-engineered what <span>celebrity stylists actually do</span> and made it affordable
        </SectionHeading>
        <div className="approach-rule" aria-hidden="true" />
        <p className="approach-lead">A good stylist does not start with trends.</p>
        <div className="approach-flow">
          <div>
            <p>They first understand your <em>face shape</em>, <em>skin undertone</em>, and <em>body type</em>.</p>
          </div>
          <ArrowDown size={34} weight="thin" aria-hidden="true" />
          <div>
            <p>They choose the right <em>haircut</em>, <em>colours</em>, <em>fits</em>, and <em>grooming</em> for you.</p>
          </div>
        </div>
        <div className="approach-statement">
          <p>We use the same approach.</p>
          <p>Your full report is built around</p>
          <strong>what suits you.</strong>
        </div>
        <div className="approach-no-list" aria-label="What the report is not based on">
          <s>Not what is trending.</s>
          <s>Not what worked for a Bollywood actor.</s>
          <s>Not what looks good on a celebrity.</s>
        </div>
        <h3 className="approach-final">What looks good on <span>you.</span></h3>
      </div>
    </section>
  );
}

function ComparisonSection() {
  return (
    <section className="section section-cool comparison-section" id="comparison">
      <div className="shell comparison-shell">
        <SectionHeading index="04" eyebrow="See the difference" intro="See what changes when the advice is built around you.">
          Generic advice vs. <span>your personal report</span>
        </SectionHeading>
        <div className="comparison-cards">
          {comparisonRows.map((item) => (
            <article className={`comparison-card ${item.title === "Cost" ? "comparison-cost" : ""}`} key={item.title}>
              <h3>{item.title}</h3>
              <div className="comparison-report-row">
                <Check size={20} weight="bold" aria-hidden="true" />
                <div><strong>Your personal report</strong><p>{item.report}</p></div>
              </div>
              <div className="comparison-generic-row">
                <X size={19} weight="bold" aria-hidden="true" />
                <div><strong>Generic advice</strong><p>{item.generic}</p></div>
              </div>
              {item.note ? <small>{item.note}</small> : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReportContents() {
  return (
    <section className="section report-contents" id="inside">
      <div className="shell">
        <SectionHeading index="05" eyebrow="Inside your report" intro="Everything is built around the same three inputs: your face, body, and skin tone.">
          What’s Inside Your <span>Personalized Style Report</span>
        </SectionHeading>
        <div className="report-grid">
          {reportItems.map((item) => (
            <article className="report-card" key={item.number}>
              <div className="report-card-visual">
                <img src={item.image} alt="" loading="lazy" />
              </div>
              <div className="report-card-copy">
                <small>{item.number}</small>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="report-closing">One report. Every part of your look covered.</p>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="section section-cool process" id="process">
      <div className="shell process-shell">
        <SectionHeading eyebrow="How our method works" intro="Share a few details. We study what suits you. Your complete report arrives within 48 hours.">
          Your Style Report, <span>Built in 3 Simple Steps</span>
        </SectionHeading>
        <div className="process-list">
          {processSteps.map((step) => (
            <article className="process-step" key={step.number}>
              <p className="process-number">{step.number}</p>
              <h3>{step.title}</h3>
              <p className="process-description">{step.description}</p>
              <ArrowDown className="process-arrow" size={38} weight="thin" aria-hidden="true" />
              <figure><img src={step.image} alt={step.alt} loading="lazy" /></figure>
            </article>
          ))}
        </div>
        <Button>Start My Style Assessment</Button>
        <p className="process-note">No appointment. Your report arrives within 48 hours.</p>
      </div>
    </section>
  );
}

function SocialProof() {
  return (
    <section className="section proof" id="reviews">
      <div className="shell">
        <SectionHeading index="07" eyebrow="Customer results" intro="Real experiences from men who stopped guessing and started dressing for their features.">
          Real men. Practical changes. <span>Clearer choices.</span>
        </SectionHeading>
        <div className="testimonial-grid">
          {testimonials.map((item, index) => (
            <article className="testimonial-card" key={index}>
              <div className="testimonial-rating" aria-label="Five stars">
                {Array.from({ length: 5 }).map((_, star) => <Star key={star} size={15} weight="fill" />)}
              </div>
              <blockquote>“{item.quote}”</blockquote>
              <footer>
                <img className="testimonial-avatar" src={item.image} alt={`${item.name}, verified customer`} loading="lazy" />
                <div><strong>{item.name}</strong><small>{item.meta}</small></div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductIntro() {
  return (
    <section className="section product-intro" id="sample">
      <div className="shell product-shell">
        <h2 className="product-title">The AttractiveMen <span>Personalized Style Report</span></h2>
        <figure className="product-stack">
          <img src="/assets/product/attractivemen-style-report-mockup-v2.png" alt="AttractiveMen personalized style report product mockup" loading="lazy" />
          <figcaption>Personalized for you &middot; Delivered within 48 hours</figcaption>
        </figure>
        <div className="product-copy">
          <p className="product-price">{"\u20B9"}1,999 + GST</p>
          <p className="product-saving">Save 33%- 80% affordable than a single stylist session, same depth of analysis</p>
          <p className="product-includes">Everything included:</p>
          <ul>
            <li><Check size={17} weight="bold" /> Face Shape Analysis</li>
            <li><Check size={17} weight="bold" /> Body Type Analysis</li>
            <li><Check size={17} weight="bold" /> Skin Tone Analysis</li>
            <li><Check size={17} weight="bold" /> Best Hairstyle Recommendation</li>
            <li><Check size={17} weight="bold" /> 20 Head-to-Toe Outfit Recommendations</li>
            <li><Check size={17} weight="bold" /> Accessories &amp; Footwear Suggestions</li>
            <li><Check size={17} weight="bold" /> Beard &amp; Mustache Guide</li>
            <li><Check size={17} weight="bold" /> 90-Day Action Plan</li>
            <li><Check size={17} weight="bold" /> Perfume Recommendations</li>
            <li><Check size={17} weight="bold" /> Wardrobe Essentials Checklist</li>
          </ul>
          <Button>Get My Personal Style Report</Button>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section section-cool faq" id="faq">
      <div className="shell faq-shell">
        <div className="faq-heading">
          <h2>Frequently asked <span>questions</span></h2>
          <p>Simple answers about the report, recommendations and how the process works.</p>
        </div>
        <div className="faq-list">
          {faqs.map(([question, answer], index) => {
            const isOpen = open === index;
            return (
              <article className={isOpen ? "open" : ""} key={question}>
                <button type="button" onClick={() => setOpen(isOpen ? -1 : index)} aria-expanded={isOpen}>
                  <span>{question}</span>
                  <CaretDown size={20} weight="regular" aria-hidden="true" />
                </button>
                <div className="faq-answer" aria-hidden={!isOpen}><p>{answer}</p></div>
              </article>
            );
          })}
        </div>
      </div>
      <div className="shell final-offer" id="purchase">
        <div>
          <h2>Stop guessing before your next haircut or purchase.</h2>
          <p>Get a complete head-to-toe plan built for your face, body, skin tone, routine and budget.</p>
          <div className="price-line"><strong>₹1,999</strong><span>One-time payment</span></div>
          <Button light>Get Your Personalized Report Now</Button>
          <p className="delivery-proof"><ShieldCheck size={20} weight="regular" /> Delivered within 48 hours after your assessment.</p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer" id="footer">
      <div className="shell footer-inner">
        <div><Brand /><p>Personal style advice made for Indian men.</p></div>
        <div className="footer-links"><a href="#inside">What’s inside</a><a href="#process">How it works</a><a href="#faq">FAQ</a></div>
        <div className="footer-meta"><span>Privacy</span><span>Terms</span><span>Support</span></div>
      </div>
      <div className="footer-wordmark" aria-label="AttractiveMen">AttractiveMen</div>
    </footer>
  );
}

function MobileStickyCTA() {
  return <a className="mobile-sticky-cta" href={CHECKOUT_TARGET}>Get my report · ₹1,999 <ArrowRight size={18} /></a>;
}

export function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProblemSection />
        <ApproachSection />
        <ComparisonSection />
        <ReportContents />
        <ProcessSection />
        <SocialProof />
        <ProductIntro />
        <FAQ />
      </main>
      <Footer />
      <MobileStickyCTA />
    </>
  );
}
