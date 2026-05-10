import { Link } from "react-router";
import { Calendar, Heart, MapPin, Clock, TrendingUp, Users, DollarSign, Star } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export function Dashboard() {
  const stats = [
    { label: "Total Bookings", value: "12", icon: Calendar, change: "+2 this month", color: "from-blue-500 to-cyan-500" },
    { label: "Saved Trips", value: "8", icon: Heart, change: "3 new favorites", color: "from-purple-500 to-pink-500" },
    { label: "Total Spent", value: "₹2,85,600", icon: DollarSign, change: "+₹65,000 this year", color: "from-green-500 to-emerald-500" },
    { label: "States Visited", value: "15", icon: MapPin, change: "Across India", color: "from-orange-500 to-red-500" },
  ];

  const upcomingTrips = [
    { id: 1, destination: "Jaipur, Rajasthan", date: "Jun 15-19, 2026", image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=400&h=300&fit=crop", status: "Confirmed", price: "₹18,000" },
    { id: 2, destination: "Kerala Backwaters", date: "Aug 10-15, 2026", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&h=300&fit=crop", status: "Pending", price: "₹28,000" },
  ];

  const pastTrips = [
    { id: 1, destination: "Goa", date: "Mar 2026", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=300&h=200&fit=crop", rating: 5 },
    { id: 2, destination: "Udaipur, Rajasthan", date: "Dec 2025", image: "https://images.unsplash.com/photo-1609920658906-8223bd289001?w=300&h=200&fit=crop", rating: 5 },
    { id: 3, destination: "Manali, Himachal Pradesh", date: "Oct 2025", image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=300&h=200&fit=crop", rating: 4 },
  ];

  const wishlist = [
    { id: 1, destination: "Ladakh", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop", price: "₹35,000" },
    { id: 2, destination: "Andaman Islands", image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=200&fit=crop", price: "₹32,000" },
    { id: 3, destination: "Rishikesh, Uttarakhand", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=300&h=200&fit=crop", price: "₹15,000" },
  ];

  const spendingData = [
    { month: "Jan", amount: 22000 },
    { month: "Feb", amount: 35000 },
    { month: "Mar", amount: 45000 },
    { month: "Apr", amount: 28000 },
    { month: "May", amount: 38000 },
    { month: "Jun", amount: 52000 },
  ];

  const tripTypeData = [
    { name: "Beach", value: 35, color: "#2563eb" },
    { name: "City", value: 30, color: "#8b5cf6" },
    { name: "Mountain", value: 25, color: "#06b6d4" },
    { name: "Cultural", value: 10, color: "#f59e0b" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-600 to-cyan-500 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Welcome back, Priya!</h1>
              <p className="text-xl text-white/90">Your next adventure awaits</p>
            </div>
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
              alt="Profile"
              className="w-16 h-16 rounded-full border-4 border-white/50 shadow-lg"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
              <div className="text-xs text-green-600 font-medium">{stat.change}</div>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Trips */}
            <div className="bg-card rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Upcoming Trips</h2>
                <Link to="/itinerary" className="text-primary hover:underline text-sm font-medium">
                  View Itinerary
                </Link>
              </div>
              <div className="space-y-4">
                {upcomingTrips.map((trip) => (
                  <div key={trip.id} className="flex gap-4 p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
                    <img src={trip.image} alt={trip.destination} className="w-24 h-24 rounded-lg object-cover" />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-lg">{trip.destination}</h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {trip.date}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          trip.status === "Confirmed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                        }`}>
                          {trip.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-lg font-bold text-primary">{trip.price}</span>
                        <Link to={`/booking/${trip.id}`}>
                          <button className="px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-white transition-colors text-sm">
                            View Details
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Analytics */}
            <div className="bg-card rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Travel Spending</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={spendingData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="amount" fill="#2563eb" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Past Trips */}
            <div className="bg-card rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Past Adventures</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {pastTrips.map((trip) => (
                  <div key={trip.id} className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all">
                      <img src={trip.image} alt={trip.destination} className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className="font-bold mb-1">{trip.destination}</h3>
                        <p className="text-sm text-white/80 mb-2">{trip.date}</p>
                        <div className="flex gap-1">
                          {[...Array(trip.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Trip Types Chart */}
            <div className="bg-card rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Trip Preferences</h2>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={tripTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {tripTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-4">
                {tripTypeData.map((type, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: type.color }}></div>
                      <span>{type.name}</span>
                    </div>
                    <span className="font-semibold">{type.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Wishlist */}
            <div className="bg-card rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Wishlist</h2>
                <Heart className="w-5 h-5 text-red-500" />
              </div>
              <div className="space-y-3">
                {wishlist.map((item) => (
                  <div key={item.id} className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all">
                      <img src={item.image} alt={item.destination} className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-3 text-white flex items-end justify-between">
                        <h3 className="font-bold">{item.destination}</h3>
                        <span className="text-sm font-semibold">{item.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/destinations">
                <button className="w-full mt-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors">
                  Browse More
                </button>
              </Link>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-6 text-white shadow-lg">
              <h2 className="text-xl font-bold mb-4">Plan Your Next Trip</h2>
              <p className="text-white/90 mb-6 text-sm">
                Discover amazing destinations and create unforgettable memories
              </p>
              <Link to="/destinations">
                <button className="w-full py-3 bg-white text-primary rounded-lg font-semibold hover:bg-white/90 transition-colors">
                  Explore Destinations
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
