import { Link, useParams } from "react-router";
import { Calendar, Users, Star, Shield, CreditCard, Info } from "lucide-react";
import { useState } from "react";

export function Booking() {
  const { id } = useParams();
  const [guests, setGuests] = useState(2);

  const destination = {
    id: 1,
    name: "Goa",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=400&fit=crop",
    price: 25000,
    duration: "5 days / 4 nights",
    rating: 4.8,
    reviews: 3421,
  };

  const packageIncludes = [
    "5-star beach resort accommodation",
    "Daily breakfast buffet",
    "Airport pickup & drop-off in AC vehicle",
    "Guided beach & heritage tours",
    "Water sports activities",
    "Travel insurance included",
  ];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-4">
            {["Details", "Review", "Payment"].map((step, index) => (
              <div key={step} className="flex items-center">
                <div className={`flex items-center gap-3 ${index === 0 ? "text-primary" : "text-muted-foreground"}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    index === 0 ? "bg-primary text-white" : "bg-muted"
                  }`}>
                    {index + 1}
                  </div>
                  <span className="font-medium hidden sm:inline">{step}</span>
                </div>
                {index < 2 && <div className="w-12 h-0.5 bg-border mx-4"></div>}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Destination Card */}
            <div className="bg-card rounded-2xl overflow-hidden shadow-lg">
              <img src={destination.image} alt={destination.name} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{destination.name}</h2>
                    <p className="text-muted-foreground">{destination.duration}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{destination.rating}</span>
                    <span className="text-sm text-muted-foreground">({destination.reviews})</span>
                  </div>
                </div>

                <div className="bg-muted/30 rounded-xl p-4">
                  <h3 className="font-semibold mb-3">Package Includes:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {packageIncludes.map((item, index) => (
                      <div key={index} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Details Form */}
            <div className="bg-card rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Booking Details</h2>

              <div className="space-y-6">
                {/* Travel Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Check-in Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="date"
                        className="w-full pl-11 pr-4 py-3 bg-input-background border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/50"
                        defaultValue="2026-06-15"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Check-out Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="date"
                        className="w-full pl-11 pr-4 py-3 bg-input-background border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/50"
                        defaultValue="2026-06-22"
                      />
                    </div>
                  </div>
                </div>

                {/* Number of Guests */}
                <div>
                  <label className="block text-sm font-medium mb-2">Number of Guests</label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      className="w-10 h-10 rounded-lg bg-muted hover:bg-primary hover:text-white transition-colors flex items-center justify-center font-bold"
                    >
                      −
                    </button>
                    <div className="flex items-center gap-2 px-6 py-3 bg-input-background border border-border rounded-xl">
                      <Users className="w-5 h-5 text-muted-foreground" />
                      <span className="font-semibold">{guests} {guests === 1 ? 'Guest' : 'Guests'}</span>
                    </div>
                    <button
                      onClick={() => setGuests(guests + 1)}
                      className="w-10 h-10 rounded-lg bg-muted hover:bg-primary hover:text-white transition-colors flex items-center justify-center font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="border-t border-border pt-6">
                  <h3 className="font-semibold mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">First Name</label>
                      <input
                        type="text"
                        placeholder="John"
                        className="w-full px-4 py-3 bg-input-background border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Name</label>
                      <input
                        type="text"
                        placeholder="Doe"
                        className="w-full px-4 py-3 bg-input-background border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 bg-input-background border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-3 bg-input-background border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label className="block text-sm font-medium mb-2">Special Requests (Optional)</label>
                  <textarea
                    rows={4}
                    placeholder="Any special requirements or preferences..."
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="bg-card rounded-2xl p-6 shadow-lg">
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" className="w-5 h-5 mt-1 rounded border-border" />
                <span className="text-sm text-foreground/80">
                  I agree to the{" "}
                  <a href="#" className="text-primary hover:underline">Terms & Conditions</a>
                  {" "}and{" "}
                  <a href="#" className="text-primary hover:underline">Cancellation Policy</a>
                </span>
              </label>
            </div>
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card rounded-2xl p-6 shadow-xl border border-border">
              <h3 className="text-xl font-bold mb-6">Booking Summary</h3>

              <div className="space-y-4 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Base Price ({guests} guests)</span>
                  <span className="font-semibold">₹{(destination.price * guests).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Service Fee</span>
                  <span className="font-semibold">₹1,500</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">GST (5%)</span>
                  <span className="font-semibold">₹{Math.round((destination.price * guests) * 0.05).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm text-green-600">
                  <span>Travel Insurance</span>
                  <span className="font-semibold">Included</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6 pb-6 border-b border-border">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-bold text-primary">
                  ₹{(destination.price * guests + 1500 + Math.round((destination.price * guests) * 0.05)).toLocaleString('en-IN')}
                </span>
              </div>

              <Link to="/checkout">
                <button className="w-full py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold hover:shadow-lg transition-all mb-4">
                  Continue to Payment
                </button>
              </Link>

              <div className="space-y-3 pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>Secure payment processing</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CreditCard className="w-4 h-4 text-green-500" />
                  <span>Free cancellation up to 48hrs</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Info className="w-4 h-4 text-green-500" />
                  <span>24/7 customer support</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <p className="text-sm text-blue-900">
                  <strong>Save 15%</strong> when you book 3+ trips this year!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
