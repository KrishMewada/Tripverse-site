import { Link } from "react-router";
import { Home, Search, Map } from "lucide-react";
import { motion } from "motion/react";

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h1 className="text-9xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-4">
              404
            </h1>
            <h2 className="text-4xl font-bold mb-4">Oops! Lost in the Journey</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Looks like you've ventured off the beaten path. The page you're looking for doesn't exist.
            </p>
          </div>

          <div className="mb-12">
            <div className="w-64 h-64 mx-auto relative">
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Map className="w-48 h-48 text-primary/20" />
              </motion.div>
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-lg">
                  <Search className="w-8 h-8 text-white" />
                </div>
              </motion.div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <button className="px-8 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2">
                <Home className="w-5 h-5" />
                Back to Home
              </button>
            </Link>
            <Link to="/destinations">
              <button className="px-8 py-3 border border-border hover:bg-muted rounded-xl font-semibold transition-colors flex items-center gap-2">
                <Search className="w-5 h-5" />
                Explore Destinations
              </button>
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link to="/">
              <div className="p-6 bg-card rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Home className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">Home</h3>
                <p className="text-sm text-muted-foreground">Start your journey</p>
              </div>
            </Link>
            <Link to="/destinations">
              <div className="p-6 bg-card rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Map className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-semibold mb-1">Destinations</h3>
                <p className="text-sm text-muted-foreground">Discover places</p>
              </div>
            </Link>
            <Link to="/dashboard">
              <div className="p-6 bg-card rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer">
                <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Search className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold mb-1">Dashboard</h3>
                <p className="text-sm text-muted-foreground">Your trips</p>
              </div>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
