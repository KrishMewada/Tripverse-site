import { Link } from "react-router";
import { CheckCircle, Calendar, MapPin, Users, Download, Mail, Home } from "lucide-react";
import { motion } from "motion/react";

export function BookingConfirmation() {
  const booking = {
    confirmationNumber: "TRIP-2026-458392",
    destination: "Goa",
    dates: "June 15-20, 2026",
    guests: 2,
    total: 54000,
    email: "priya@example.com",
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <h1 className="text-4xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-xl text-muted-foreground">
            Your adventure to {booking.destination} is all set
          </p>
        </motion.div>

        {/* Confirmation Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-2xl p-8 shadow-xl mb-8"
        >
          <div className="text-center mb-8">
            <p className="text-sm text-muted-foreground mb-2">Confirmation Number</p>
            <p className="text-2xl font-bold text-primary">{booking.confirmationNumber}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-xl">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Destination</p>
                <p className="font-semibold">{booking.destination}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-xl">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Travel Dates</p>
                <p className="font-semibold">{booking.dates}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-xl">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Guests</p>
                <p className="font-semibold">{booking.guests} travelers</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-xl">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Confirmation Sent To</p>
                <p className="font-semibold">{booking.email}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total Paid</span>
              <span className="text-3xl font-bold text-primary">₹{booking.total.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card rounded-2xl p-8 shadow-lg mb-8"
        >
          <h2 className="text-2xl font-bold mb-6">What's Next?</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-semibold mb-1">Check Your Email</h3>
                <p className="text-sm text-muted-foreground">
                  We've sent a confirmation email with all your booking details and travel documents
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-semibold mb-1">Review Your Itinerary</h3>
                <p className="text-sm text-muted-foreground">
                  Access your detailed day-by-day itinerary in your dashboard
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-semibold mb-1">Prepare for Your Trip</h3>
                <p className="text-sm text-muted-foreground">
                  We'll send you travel tips and reminders as your departure date approaches
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <Link to="/dashboard">
            <button className="w-full px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
              <Home className="w-5 h-5" />
              View Dashboard
            </button>
          </Link>
          <Link to="/itinerary">
            <button className="w-full px-6 py-3 border border-border hover:bg-muted rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
              <Calendar className="w-5 h-5" />
              View Itinerary
            </button>
          </Link>
          <button className="w-full px-6 py-3 border border-border hover:bg-muted rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
            <Download className="w-5 h-5" />
            Download PDF
          </button>
        </motion.div>

        {/* Help Section */}
        <div className="mt-8 text-center p-6 bg-blue-50 border border-blue-200 rounded-2xl">
          <h3 className="font-semibold text-blue-900 mb-2">Need Help?</h3>
          <p className="text-sm text-blue-800 mb-4">
            Our support team is available 24/7 to assist you
          </p>
          <div className="flex gap-4 justify-center">
            <a href="mailto:support@tripverse.com" className="text-primary hover:underline text-sm font-medium">
              Email Support
            </a>
            <a href="tel:+1-800-TRIPVERSE" className="text-primary hover:underline text-sm font-medium">
              Call Us
            </a>
            <a href="#" className="text-primary hover:underline text-sm font-medium">
              Live Chat
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
