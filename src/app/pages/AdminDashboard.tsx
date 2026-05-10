import { Users, MapPin, DollarSign, TrendingUp, Search, MoreVertical, Eye, Edit, Trash2 } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useState } from "react";

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    { label: "Total Users", value: "12,458", change: "+12%", icon: Users, color: "from-blue-500 to-cyan-500" },
    { label: "Active Bookings", value: "3,421", change: "+8%", icon: MapPin, color: "from-purple-500 to-pink-500" },
    { label: "Revenue (MTD)", value: "₹3.8 Cr", change: "+23%", icon: DollarSign, color: "from-green-500 to-emerald-500" },
    { label: "Growth Rate", value: "18.2%", change: "+3.1%", icon: TrendingUp, color: "from-orange-500 to-red-500" },
  ];

  const revenueData = [
    { month: "Jan", revenue: 45000, bookings: 320 },
    { month: "Feb", revenue: 52000, bookings: 380 },
    { month: "Mar", revenue: 48000, bookings: 350 },
    { month: "Apr", revenue: 61000, bookings: 420 },
    { month: "May", revenue: 55000, bookings: 390 },
    { month: "Jun", revenue: 68000, bookings: 450 },
  ];

  const destinationData = [
    { name: "Beach", value: 40, color: "#2563eb" },
    { name: "City", value: 30, color: "#8b5cf6" },
    { name: "Mountain", value: 20, color: "#06b6d4" },
    { name: "Cultural", value: 10, color: "#f59e0b" },
  ];

  const recentBookings = [
    { id: 1, user: "Priya Sharma", destination: "Goa", date: "2026-06-15", amount: "₹25,000", status: "Confirmed" },
    { id: 2, user: "Rahul Verma", destination: "Jaipur, Rajasthan", date: "2026-07-20", amount: "₹18,000", status: "Pending" },
    { id: 3, user: "Sneha Patel", destination: "Manali, HP", date: "2026-08-10", amount: "₹22,000", status: "Confirmed" },
    { id: 4, user: "Arjun Reddy", destination: "Kerala Backwaters", date: "2026-09-05", amount: "₹28,000", status: "Confirmed" },
    { id: 5, user: "Ananya Krishnan", destination: "Ladakh", date: "2026-10-12", amount: "₹35,000", status: "Pending" },
  ];

  const topDestinations = [
    { name: "Goa", bookings: 842, revenue: "₹2.1 Cr", growth: "+15%" },
    { name: "Jaipur, Rajasthan", bookings: 756, revenue: "₹1.4 Cr", growth: "+22%" },
    { name: "Manali, HP", bookings: 689, revenue: "₹1.5 Cr", growth: "+18%" },
    { name: "Kerala Backwaters", bookings: 543, revenue: "₹1.3 Cr", growth: "+12%" },
    { name: "Ladakh", bookings: 498, revenue: "₹1.7 Cr", growth: "+25%" },
  ];

  const users = [
    { id: 1, name: "Priya Sharma", email: "priya@example.com", trips: 5, spent: "₹2,45,000", joined: "Jan 2025", status: "Active" },
    { id: 2, name: "Rahul Verma", email: "rahul@example.com", trips: 3, spent: "₹1,85,000", joined: "Mar 2025", status: "Active" },
    { id: 3, name: "Sneha Patel", email: "sneha@example.com", trips: 8, spent: "₹3,65,000", joined: "Dec 2024", status: "VIP" },
    { id: 4, name: "Arjun Reddy", email: "arjun@example.com", trips: 2, spent: "₹95,000", joined: "Apr 2026", status: "Active" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-white/80">Manage your travel platform</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-card rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-green-600">{stat.change}</span>
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="border-b border-border mb-8">
          <div className="flex gap-8 overflow-x-auto">
            {["overview", "bookings", "destinations", "users"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-sm font-medium whitespace-nowrap transition-colors capitalize ${
                  activeTab === tab
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-card rounded-2xl p-6 shadow-lg">
                <h2 className="text-xl font-bold mb-6">Revenue & Bookings Trend</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2} />
                    <Line type="monotone" dataKey="bookings" stroke="#8b5cf6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-card rounded-2xl p-6 shadow-lg">
                <h2 className="text-xl font-bold mb-6">Booking Categories</h2>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={destinationData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {destinationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2 mt-4">
                  {destinationData.map((type, index) => (
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
            </div>

            {/* Top Destinations */}
            <div className="bg-card rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-6">Top Destinations</h2>
              <div className="space-y-4">
                {topDestinations.map((dest, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-semibold">{dest.name}</h3>
                        <p className="text-sm text-muted-foreground">{dest.bookings} bookings</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{dest.revenue}</p>
                      <p className="text-sm text-green-600">{dest.growth}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === "bookings" && (
          <div className="bg-card rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Recent Bookings</h2>
                <div className="flex gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search bookings..."
                      className="pl-10 pr-4 py-2 bg-input-background border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                    />
                  </div>
                  <select className="px-4 py-2 bg-input-background border border-border rounded-lg outline-none text-sm">
                    <option>All Status</option>
                    <option>Confirmed</option>
                    <option>Pending</option>
                    <option>Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/30">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Destination</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {recentBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium">#{booking.id}</td>
                      <td className="px-6 py-4 text-sm">{booking.user}</td>
                      <td className="px-6 py-4 text-sm">{booking.destination}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{booking.date}</td>
                      <td className="px-6 py-4 text-sm font-semibold">{booking.amount}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          booking.status === "Confirmed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button className="p-1 hover:bg-muted rounded">
                            <Eye className="w-4 h-4 text-muted-foreground" />
                          </button>
                          <button className="p-1 hover:bg-muted rounded">
                            <Edit className="w-4 h-4 text-muted-foreground" />
                          </button>
                          <button className="p-1 hover:bg-muted rounded">
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="bg-card rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">User Management</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="pl-10 pr-4 py-2 bg-input-background border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                  />
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/30">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Trips</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Total Spent</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Joined</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="font-medium">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{user.email}</td>
                      <td className="px-6 py-4 text-sm">{user.trips}</td>
                      <td className="px-6 py-4 text-sm font-semibold">{user.spent}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{user.joined}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.status === "VIP" ? "bg-purple-100 text-purple-700" : "bg-green-100 text-green-700"
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="p-1 hover:bg-muted rounded">
                          <MoreVertical className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Destinations Tab */}
        {activeTab === "destinations" && (
          <div className="bg-card rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Manage Destinations</h2>
              <button className="px-4 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-lg hover:shadow-lg transition-all">
                Add New Destination
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topDestinations.map((dest, index) => (
                <div key={index} className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all">
                  <img src={`https://images.unsplash.com/photo-${1537996194471 + index}?w=400&h=300&fit=crop`} alt={dest.name} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-bold text-lg mb-1">{dest.name}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{dest.bookings} bookings</span>
                      <span className="font-semibold">{dest.revenue}</span>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-8 h-8 bg-white rounded-lg flex items-center justify-center hover:bg-white/90">
                      <Edit className="w-4 h-4 text-foreground" />
                    </button>
                    <button className="w-8 h-8 bg-white rounded-lg flex items-center justify-center hover:bg-white/90">
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
