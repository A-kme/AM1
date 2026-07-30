import assert from "node:assert/strict";
import test from "node:test";
import {
  buildRedirectUrl,
  calculateCheckoutTotals,
  createMerchantOrderId,
  getCheckoutValidationErrors,
} from "./checkout.js";

test("calculates trusted server-side totals from selected bump ids", () => {
  assert.deepEqual(calculateCheckoutTotals([]), {
    basePrice: 1999,
    bumpsTotal: 0,
    subtotal: 1999,
    gst: 359.82,
    total: 2358.82,
    amountPaise: 235882,
    selectedBumps: [],
  });

  assert.deepEqual(calculateCheckoutTotals(["call"]), {
    basePrice: 1999,
    bumpsTotal: 799,
    subtotal: 2798,
    gst: 503.64,
    total: 3301.64,
    amountPaise: 330164,
    selectedBumps: [
      {
        id: "call",
        title: "20-Minute Style Review Call",
        price: 799,
      },
    ],
  });
});

test("rejects invalid contact fields and unknown bump ids", () => {
  const errors = getCheckoutValidationErrors({
    details: { name: "A", email: "bad", phone: "123" },
    selected: ["unknown"],
  });

  assert.equal(errors.name, "Please enter your full name.");
  assert.equal(errors.email, "Please enter a valid email address.");
  assert.equal(errors.phone, "Please enter a valid 10-digit mobile number.");
  assert.equal(errors.selected, "Please refresh and try again.");
});

test("builds PhonePe-safe redirect and merchant order ids", () => {
  assert.equal(
    buildRedirectUrl("https://thriveonp.com/", "AM_123"),
    "https://thriveonp.com/a-m-thankyou?merchantOrderId=AM_123",
  );

  const id = createMerchantOrderId();
  assert.match(id, /^AM_[A-Za-z0-9_-]+$/);
  assert.ok(id.length <= 63);
});
