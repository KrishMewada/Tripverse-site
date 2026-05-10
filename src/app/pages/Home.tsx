import { Link } from "react-router";
import { Search, MapPin, Calendar, Users, Star, TrendingUp, Award, Shield, Globe } from "lucide-react";
import { motion } from "motion/react";
import { indianDestinations, travelPackages, indianReviews } from "../data/destinations";

export function Home() {
  const featuredDestinations = indianDestinations.slice(0, 4).map(dest => ({
    ...dest,
    price: `₹${dest.price.toLocaleString('en-IN')}`
  }));

  const testimonials = indianReviews.slice(0, 3);

  const features = [
    { icon: Shield, title: "Safe & Secure", description: "Your bookings are protected with industry-leading security" },
    { icon: Award, title: "Best Price Guarantee", description: "We match any lower price you find elsewhere" },
    { icon: Globe, title: "Worldwide Coverage", description: "Access to 10,000+ destinations across the globe" },
    { icon: Users, title: "24/7 Support", description: "Our travel experts are always here to help you" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-600 to-cyan-500">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-20"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Explore the World<br />With TRIP Verse
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
              Discover amazing destinations, plan unforgettable trips, and create memories that last a lifetime
            </p>

            {/* Search Bar */}
            <div className="max-w-4xl mx-auto backdrop-blur-xl bg-white/95 rounded-2xl shadow-2xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-3 px-4 py-3 bg-muted/50 rounded-xl">
                  <MapPin className="w-5 h-5 text-primary" />
                  <input
                    type="text"
                    placeholder="Where to?"
                    className="bg-transparent border-none outline-none flex-1 text-foreground"
                  />
                </div>
                <div className="flex items-center gap-3 px-4 py-3 bg-muted/50 rounded-xl">
                  <Calendar className="w-5 h-5 text-primary" />
                  <input
                    type="text"
                    placeholder="Check in"
                    className="bg-transparent border-none outline-none flex-1 text-foreground"
                  />
                </div>
                <div className="flex items-center gap-3 px-4 py-3 bg-muted/50 rounded-xl">
                  <Users className="w-5 h-5 text-primary" />
                  <input
                    type="text"
                    placeholder="Guests"
                    className="bg-transparent border-none outline-none flex-1 text-foreground"
                  />
                </div>
                <Link to="/destinations">
                  <button className="w-full h-full px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl hover:shadow-xl transition-all flex items-center justify-center gap-2">
                    <Search className="w-5 h-5" />
                    Search
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Featured Destinations</h2>
            <p className="text-muted-foreground text-lg">Explore our most popular travel destinations</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDestinations.map((destination) => (
              <Link key={destination.id} to={`/destinations/${destination.id}`}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="font-bold text-xl mb-2">{destination.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold">{destination.price}</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{destination.rating} ({destination.reviews})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/destinations">
              <button className="px-8 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl hover:shadow-lg transition-all">
                View All Destinations
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Travel Packages */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Popular Travel Packages</h2>
            <p className="text-muted-foreground text-lg">Curated experiences for every type of traveler</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {travelPackages.slice(0, 3).map((pkg, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
              >
                <img src={pkg.image} alt={pkg.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">{pkg.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{pkg.description}</p>
                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{pkg.destinations}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{pkg.duration}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">₹{pkg.price.toLocaleString('en-IN')}</span>
                    <button className="px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-white transition-colors">
                      Explore
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">What Travelers Say</h2>
            <p className="text-muted-foreground text-lg">Read experiences from our happy customers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-foreground/80 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gradient-to-r from-primary via-blue-600 to-accent text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Get Travel Inspiration</h2>
          <p className="text-xl text-white/90 mb-8">Subscribe to our newsletter for exclusive deals and travel tips</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-xl bg-white/20 backdrop-blur-xl border border-white/30 text-white placeholder:text-white/70 outline-none focus:ring-2 focus:ring-white/50"
            />
            <button className="px-8 py-3 bg-white text-primary rounded-xl font-semibold hover:bg-white/90 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
