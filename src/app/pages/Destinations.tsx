import { Link } from "react-router";
import { Search, SlidersHorizontal, Star, MapPin, Calendar, IndianRupee, X } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import { indianDestinations } from "../data/destinations";

export function Destinations() {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 40000]);

  const destinations = indianDestinations;

  const categories = [
    { id: "all", name: "All Destinations", count: destinations.length },
    { id: "beach", name: "Beach", count: destinations.filter(d => d.category === "beach").length },
    { id: "city", name: "City", count: destinations.filter(d => d.category === "city").length },
    { id: "mountain", name: "Mountain", count: destinations.filter(d => d.category === "mountain").length },
    { id: "spiritual", name: "Spiritual", count: destinations.filter(d => d.category === "spiritual").length },
    { id: "nature", name: "Nature", count: destinations.filter(d => d.category === "nature").length },
    { id: "heritage", name: "Heritage", count: destinations.filter(d => d.category === "heritage").length },
  ];

  const filteredDestinations = destinations.filter(dest => {
    const matchesCategory = selectedCategory === "all" || dest.category === selectedCategory;
    const matchesPrice = dest.price >= priceRange[0] && dest.price <= priceRange[1];
    return matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-600 to-cyan-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Explore Destinations</h1>
          <p className="text-xl text-white/90 mb-8">Discover your next adventure from our curated collection</p>

          {/* Search Bar */}
          <div className="max-w-2xl backdrop-blur-xl bg-white/95 rounded-2xl shadow-2xl p-4">
            <div className="flex gap-3">
              <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-muted/50 rounded-xl">
                <Search className="w-5 h-5 text-primary" />
                <input
                  type="text"
                  placeholder="Search destinations..."
                  className="bg-transparent border-none outline-none flex-1 text-foreground"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors flex items-center gap-2"
              >
                <SlidersHorizontal className="w-5 h-5" />
                <span className="hidden sm:inline">Filters</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Categories */}
              <div className="bg-card rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        selectedCategory === category.id
                          ? "bg-primary text-white"
                          : "hover:bg-muted"
                      }`}
                    >
                      <span className="text-sm font-medium">{category.name}</span>
                      <span className="ml-2 text-xs opacity-70">({category.count})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="bg-card rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold mb-4">Price Range</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Min</span>
                    <span className="font-semibold">₹{priceRange[0].toLocaleString('en-IN')}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="40000"
                    step="1000"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full"
                  />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Max</span>
                    <span className="font-semibold">₹{priceRange[1].toLocaleString('en-IN')}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="40000"
                    step="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Rating Filter */}
              <div className="bg-card rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold mb-4">Rating</h3>
                <div className="space-y-2">
                  {[5, 4, 3].map((rating) => (
                    <label key={rating} className="flex items-center gap-2 cursor-pointer hover:bg-muted p-2 rounded-lg">
                      <input type="checkbox" className="w-4 h-4 rounded border-border" />
                      <div className="flex items-center gap-1">
                        {[...Array(rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="text-sm ml-1">& up</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{filteredDestinations.length}</span> destinations
              </p>
              <select className="px-4 py-2 bg-card border border-border rounded-lg outline-none">
                <option>Most Popular</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Highest Rated</option>
              </select>
            </div>

            {/* Destinations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredDestinations.map((destination) => (
                <Link key={destination.id} to={`/destinations/${destination.id}`}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={destination.image}
                        alt={destination.name}
                        className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                        <button className="hover:text-red-500 transition-colors">
                          <Star className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="absolute bottom-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold">
                        {destination.category}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-lg">{destination.name}</h3>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-semibold">{destination.rating}</span>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-2">
                        {destination.reviews.toLocaleString('en-IN')} reviews • {destination.duration}
                      </p>
                      <p className="text-xs text-muted-foreground mb-4">{destination.state}</p>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Starting from</p>
                          <p className="text-2xl font-bold text-primary">₹{destination.price.toLocaleString('en-IN')}</p>
                        </div>
                        <button className="px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-white transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowFilters(false)}></div>
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Filters</h2>
              <button onClick={() => setShowFilters(false)} className="p-2 hover:bg-muted rounded-lg">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        selectedCategory === category.id ? "bg-primary text-white" : "bg-muted"
                      }`}
                    >
                      {category.name} ({category.count})
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
