import { Link } from "react-router";
import { Plane, Mail, ArrowLeft } from "lucide-react";
import { motion } from "motion/react";

export function ForgotPassword() {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900 via-cyan-600 to-blue-500">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&h=1200&fit=crop')] bg-cover bg-center opacity-30"></div>
        </div>
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <h2 className="text-5xl font-bold mb-6">Reset Your Password</h2>
          <p className="text-xl text-white/90">Don't worry, we'll help you get back to planning your next adventure</p>
        </div>
      </div>

      {/* Right Side - Reset Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
              <Plane className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              TRIP Verse
            </span>
          </Link>

          <h1 className="text-3xl font-bold mb-2">Forgot your password?</h1>
          <p className="text-muted-foreground mb-8">
            Enter your email address and we'll send you instructions to reset your password
          </p>

          {/* Reset Form */}
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full pl-11 pr-4 py-3 bg-input-background border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Send Reset Link
            </button>
          </form>

          <Link to="/login" className="flex items-center justify-center gap-2 mt-6 text-sm text-primary hover:underline">
            <ArrowLeft className="w-4 h-4" />
            Back to login
          </Link>

          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <p className="text-sm text-blue-900">
              <strong>Note:</strong> If you don't receive an email within 5 minutes, check your spam folder or contact support.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
