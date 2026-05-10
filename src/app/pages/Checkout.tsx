import { Link } from "react-router";
import { CreditCard, Lock, Shield, ArrowLeft } from "lucide-react";
import { useState } from "react";

export function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState("card");

  const bookingSummary = {
    destination: "Goa",
    dates: "June 15-20, 2026",
    guests: 2,
    basePrice: 50000,
    serviceFee: 1500,
    taxes: 2500,
    total: 54000,
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-4">
            {["Details", "Review", "Payment"].map((step, index) => (
              <div key={step} className="flex items-center">
                <div className={`flex items-center gap-3 ${index <= 2 ? "text-primary" : "text-muted-foreground"}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    index === 2 ? "bg-primary text-white" : index < 2 ? "bg-primary/20 text-primary" : "bg-muted"
                  }`}>
                    {index < 2 ? "✓" : index + 1}
                  </div>
                  <span className="font-medium hidden sm:inline">{step}</span>
                </div>
                {index < 2 && <div className={`w-12 h-0.5 mx-4 ${index < 2 ? "bg-primary" : "bg-border"}`}></div>}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-6">
                <Shield className="w-6 h-6 text-green-500" />
                <div>
                  <h2 className="text-2xl font-bold">Secure Payment</h2>
                  <p className="text-sm text-muted-foreground">Your information is protected with 256-bit SSL encryption</p>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">Payment Method</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { id: "card", label: "Credit Card", icon: "💳" },
                    { id: "paypal", label: "PayPal", icon: "🅿️" },
                    { id: "bank", label: "Bank Transfer", icon: "🏦" },
                  ].map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-4 border-2 rounded-xl transition-all ${
                        paymentMethod === method.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="text-3xl mb-2">{method.icon}</div>
                      <div className="text-sm font-medium">{method.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Card Details */}
              {paymentMethod === "card" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Card Number</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full pl-11 pr-4 py-3 bg-input-background border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 bg-input-background border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">CVV</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full pl-10 pr-4 py-3 bg-input-background border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/50"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Cardholder Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-4 py-3 bg-input-background border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === "paypal" && (
                <div className="py-8 text-center">
                  <div className="mb-4 text-4xl">🅿️</div>
                  <h3 className="text-lg font-semibold mb-2">Pay with PayPal</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    You will be redirected to PayPal to complete your payment
                  </p>
                  <button className="px-6 py-3 bg-[#0070ba] text-white rounded-xl font-semibold hover:bg-[#005ea6] transition-colors">
                    Continue to PayPal
                  </button>
                </div>
              )}

              {paymentMethod === "bank" && (
                <div className="py-8 text-center bg-muted/30 rounded-xl">
                  <div className="mb-4 text-4xl">🏦</div>
                  <h3 className="text-lg font-semibold mb-2">Bank Transfer Details</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Transfer the total amount to the following account
                  </p>
                  <div className="max-w-md mx-auto text-left space-y-2 bg-card p-4 rounded-lg">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Account Name:</span>
                      <span className="font-semibold">TRIP Verse Ltd.</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Account Number:</span>
                      <span className="font-semibold">1234567890</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">SWIFT Code:</span>
                      <span className="font-semibold">TRIPUS33</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Billing Address */}
            <div className="bg-card rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-4">Billing Address</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Country</label>
                    <select className="w-full px-4 py-3 bg-input-background border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/50">
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>Canada</option>
                      <option>Australia</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Zip Code</label>
                    <input
                      type="text"
                      placeholder="10001"
                      className="w-full px-4 py-3 bg-input-background border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Street Address</label>
                  <input
                    type="text"
                    placeholder="123 Main Street"
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">City</label>
                    <input
                      type="text"
                      placeholder="New York"
                      className="w-full px-4 py-3 bg-input-background border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">State</label>
                    <input
                      type="text"
                      placeholder="NY"
                      className="w-full px-4 py-3 bg-input-background border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Link to="/booking/1" className="flex-1">
                <button className="w-full px-6 py-3 border border-border rounded-xl hover:bg-muted transition-colors flex items-center justify-center gap-2">
                  <ArrowLeft className="w-5 h-5" />
                  Back
                </button>
              </Link>
              <Link to="/confirmation" className="flex-1">
                <button className="w-full px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                  Complete Booking
                </button>
              </Link>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card rounded-2xl p-6 shadow-xl border border-border">
              <h3 className="text-xl font-bold mb-6">Order Summary</h3>

              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="font-semibold mb-1">{bookingSummary.destination}</h4>
                  <p className="text-sm text-muted-foreground">{bookingSummary.dates}</p>
                  <p className="text-sm text-muted-foreground">{bookingSummary.guests} guests</p>
                </div>
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Base Price</span>
                  <span className="font-semibold">₹{bookingSummary.basePrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Service Fee</span>
                  <span className="font-semibold">₹{bookingSummary.serviceFee.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">GST (5%)</span>
                  <span className="font-semibold">₹{bookingSummary.taxes.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm text-green-600">
                  <span>Travel Insurance</span>
                  <span className="font-semibold">Included</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold">Total Amount</span>
                <span className="text-3xl font-bold text-primary">₹{bookingSummary.total.toLocaleString('en-IN')}</span>
              </div>

              <div className="bg-muted/30 rounded-xl p-4">
                <div className="flex items-start gap-2 mb-2">
                  <Lock className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-foreground/80">
                    Your payment information is encrypted and secure
                  </p>
                </div>
                <div className="flex gap-2 mt-3">
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='25' viewBox='0 0 40 25'%3E%3Crect fill='%231434CB' width='40' height='25' rx='3'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='10' font-weight='bold'%3EVISA%3C/text%3E%3C/svg%3E" alt="Visa" className="h-6" />
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='25' viewBox='0 0 40 25'%3E%3Crect fill='%23EB001B' width='20' height='25' rx='3'/%3E%3Crect fill='%23F79E1B' x='20' width='20' height='25' rx='3'/%3E%3C/svg%3E" alt="Mastercard" className="h-6" />
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='25' viewBox='0 0 40 25'%3E%3Crect fill='%2300457C' width='40' height='25' rx='3'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='8' font-weight='bold'%3EAMEX%3C/text%3E%3C/svg%3E" alt="Amex" className="h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
