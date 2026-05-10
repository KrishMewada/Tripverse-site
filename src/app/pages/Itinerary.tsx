import { Calendar, MapPin, Clock, Plus, Edit2, Trash2, Download, Share2 } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

export function Itinerary() {
  const [selectedTrip, setSelectedTrip] = useState("goa");

  const trips = [
    { id: "goa", name: "Goa Beach Getaway", date: "Jun 15-20, 2026", destination: "Goa" },
    { id: "jaipur", name: "Royal Rajasthan", date: "Aug 10-14, 2026", destination: "Jaipur, Rajasthan" },
  ];

  const itinerary = {
    goa: [
      {
        day: 1,
        date: "June 15, 2026",
        activities: [
          { time: "09:00", title: "Arrival at Goa Airport", location: "Dabolim Airport", type: "travel", duration: "1h" },
          { time: "11:00", title: "Hotel Check-in", location: "Taj Exotica Resort", type: "accommodation", duration: "30min" },
          { time: "14:00", title: "Lunch at Beach Shack", location: "Calangute Beach", type: "food", duration: "1.5h" },
          { time: "16:00", title: "Beach Relaxation", location: "Baga Beach", type: "activity", duration: "2h" },
          { time: "19:00", title: "Sunset at Vagator Beach", location: "Vagator Beach", type: "activity", duration: "1.5h" },
        ],
      },
      {
        day: 2,
        date: "June 16, 2026",
        activities: [
          { time: "08:00", title: "Breakfast at Hotel", location: "Taj Exotica Resort", type: "food", duration: "1h" },
          { time: "09:30", title: "Old Goa Churches Tour", location: "Basilica of Bom Jesus", type: "activity", duration: "3h" },
          { time: "13:00", title: "Traditional Goan Lunch", location: "Panjim", type: "food", duration: "1.5h" },
          { time: "15:00", title: "Spice Plantation Visit", location: "Ponda", type: "activity", duration: "2h" },
          { time: "19:00", title: "Dinner Cruise", location: "Mandovi River", type: "food", duration: "2h" },
        ],
      },
      {
        day: 3,
        date: "June 17, 2026",
        activities: [
          { time: "09:00", title: "Water Sports", location: "Calangute Beach", type: "activity", duration: "3h" },
          { time: "13:00", title: "Seafood Lunch", location: "Beach Restaurant", type: "food", duration: "1.5h" },
          { time: "15:00", title: "Fort Aguada Visit", location: "Candolim", type: "activity", duration: "2h" },
          { time: "18:00", title: "Shopping at Flea Market", location: "Anjuna Flea Market", type: "activity", duration: "2h" },
        ],
      },
      {
        day: 4,
        date: "June 18, 2026",
        activities: [
          { time: "09:00", title: "Dudhsagar Waterfall Trip", location: "Mollem", type: "activity", duration: "6h" },
          { time: "16:00", title: "Return to Hotel", location: "Resort", type: "travel", duration: "1h" },
          { time: "18:00", title: "Spa & Wellness", location: "Hotel Spa", type: "activity", duration: "2h" },
          { time: "20:00", title: "Beachside BBQ Dinner", location: "Resort Beach", type: "food", duration: "2h" },
        ],
      },
      {
        day: 5,
        date: "June 19, 2026",
        activities: [
          { time: "09:00", title: "Leisure Morning", location: "Pool/Beach", type: "activity", duration: "3h" },
          { time: "12:00", title: "Check-out & Lunch", location: "Resort", type: "food", duration: "1h" },
          { time: "14:00", title: "Last Minute Shopping", location: "Panjim City", type: "activity", duration: "2h" },
          { time: "17:00", title: "Airport Transfer", location: "Dabolim Airport", type: "travel", duration: "1h" },
        ],
      },
    ],
    jaipur: [
      {
        day: 1,
        date: "August 10, 2026",
        activities: [
          { time: "09:00", title: "Arrival at Jaipur Airport", location: "Jaipur International Airport", type: "travel", duration: "1h" },
          { time: "11:00", title: "Hotel Check-in", location: "The Oberoi Rajvilas", type: "accommodation", duration: "30min" },
          { time: "13:00", title: "Lunch at Hotel", location: "The Oberoi Rajvilas", type: "food", duration: "1.5h" },
          { time: "15:00", title: "City Palace Visit", location: "City Palace Complex", type: "activity", duration: "2h" },
          { time: "17:30", title: "Hawa Mahal Photo Stop", location: "Hawa Mahal", type: "activity", duration: "45min" },
          { time: "19:00", title: "Traditional Rajasthani Dinner", location: "Chokhi Dhani", type: "food", duration: "3h" },
        ],
      },
      {
        day: 2,
        date: "August 11, 2026",
        activities: [
          { time: "08:00", title: "Breakfast at Hotel", location: "The Oberoi Rajvilas", type: "food", duration: "1h" },
          { time: "09:30", title: "Amber Fort with Elephant Ride", location: "Amber Fort", type: "activity", duration: "3h" },
          { time: "13:00", title: "Lunch at 1135 AD", location: "Amber Fort", type: "food", duration: "1.5h" },
          { time: "15:00", title: "Jaigarh Fort Visit", location: "Jaigarh Fort", type: "activity", duration: "2h" },
          { time: "18:00", title: "Light & Sound Show", location: "Amber Fort", type: "activity", duration: "1.5h" },
        ],
      },
      {
        day: 3,
        date: "August 12, 2026",
        activities: [
          { time: "09:00", title: "Jantar Mantar Visit", location: "Jantar Mantar", type: "activity", duration: "1.5h" },
          { time: "11:00", title: "Shopping at Johari Bazaar", location: "Johari Bazaar", type: "activity", duration: "2h" },
          { time: "13:00", title: "Lunch at Laxmi Mishthan Bhandar", location: "Johari Bazaar", type: "food", duration: "1h" },
          { time: "15:00", title: "Block Printing Workshop", location: "Sanganer", type: "activity", duration: "2h" },
          { time: "18:00", title: "Nahargarh Fort Sunset", location: "Nahargarh Fort", type: "activity", duration: "2h" },
        ],
      },
      {
        day: 4,
        date: "August 13, 2026",
        activities: [
          { time: "09:00", title: "Albert Hall Museum", location: "Ram Niwas Garden", type: "activity", duration: "2h" },
          { time: "12:00", title: "Last Minute Shopping", location: "Bapu Bazaar", type: "activity", duration: "2h" },
          { time: "14:00", title: "Check-out & Lunch", location: "Hotel", type: "food", duration: "1h" },
          { time: "16:00", title: "Airport Transfer", location: "Jaipur Airport", type: "travel", duration: "1h" },
        ],
      },
    ],
  };

  const typeColors = {
    travel: "bg-blue-100 text-blue-700 border-blue-200",
    accommodation: "bg-purple-100 text-purple-700 border-purple-200",
    food: "bg-orange-100 text-orange-700 border-orange-200",
    activity: "bg-green-100 text-green-700 border-green-200",
  };

  const typeIcons = {
    travel: "✈️",
    accommodation: "🏨",
    food: "🍽️",
    activity: "🎭",
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-900 via-purple-600 to-pink-500 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-4">My Itineraries</h1>
          <p className="text-xl text-white/90">Plan and organize your perfect trip</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Trip List */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <button className="w-full px-4 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                <Plus className="w-5 h-5" />
                New Itinerary
              </button>

              <div className="space-y-2">
                {trips.map((trip) => (
                  <button
                    key={trip.id}
                    onClick={() => setSelectedTrip(trip.id)}
                    className={`w-full text-left p-4 rounded-xl transition-all ${
                      selectedTrip === trip.id
                        ? "bg-primary text-white shadow-lg"
                        : "bg-card hover:bg-muted"
                    }`}
                  >
                    <h3 className="font-bold mb-1">{trip.name}</h3>
                    <p className={`text-sm ${selectedTrip === trip.id ? "text-white/80" : "text-muted-foreground"}`}>
                      {trip.date}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content - Itinerary */}
          <div className="lg:col-span-3">
            {/* Trip Header */}
            <div className="bg-card rounded-2xl p-6 shadow-lg mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold mb-2">
                    {trips.find(t => t.id === selectedTrip)?.name}
                  </h2>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{trips.find(t => t.id === selectedTrip)?.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{trips.find(t => t.id === selectedTrip)?.destination}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                    <Download className="w-5 h-5" />
                  </button>
                  <button className="px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-white transition-colors">
                    Edit Trip
                  </button>
                </div>
              </div>

              <div className="flex gap-2 flex-wrap">
                {Object.entries(typeColors).map(([type, colors]) => (
                  <span key={type} className={`px-3 py-1 rounded-full text-xs font-medium border ${colors}`}>
                    {typeIcons[type as keyof typeof typeIcons]} {type.charAt(0).toUpperCase() + type.slice(1)}
                  </span>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-8">
              {itinerary[selectedTrip as keyof typeof itinerary]?.map((dayPlan) => (
                <motion.div
                  key={dayPlan.day}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: dayPlan.day * 0.1 }}
                  className="bg-card rounded-2xl p-6 shadow-lg"
                >
                  {/* Day Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white shadow-lg">
                      <div className="text-center">
                        <div className="text-xs opacity-80">Day</div>
                        <div className="text-xl font-bold">{dayPlan.day}</div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{dayPlan.date}</h3>
                      <p className="text-sm text-muted-foreground">{dayPlan.activities.length} activities planned</p>
                    </div>
                  </div>

                  {/* Activities */}
                  <div className="relative space-y-4 pl-12">
                    {/* Timeline Line */}
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-accent opacity-30"></div>

                    {dayPlan.activities.map((activity, index) => (
                      <div key={index} className="relative">
                        {/* Timeline Dot */}
                        <div className="absolute -left-14 top-3 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold shadow-lg">
                          {typeIcons[activity.type as keyof typeof typeIcons]}
                        </div>

                        <div className="group bg-muted/30 hover:bg-muted/50 rounded-xl p-4 transition-all">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <Clock className="w-4 h-4 text-primary" />
                                <span className="text-sm font-semibold text-primary">{activity.time}</span>
                                <span className={`px-2 py-0.5 rounded-full text-xs ${typeColors[activity.type as keyof typeof typeColors]}`}>
                                  {activity.duration}
                                </span>
                              </div>
                              <h4 className="font-bold text-lg mb-1">{activity.title}</h4>
                              <p className="text-sm text-muted-foreground flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {activity.location}
                              </p>
                            </div>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="p-2 hover:bg-primary/10 rounded-lg transition-colors">
                                <Edit2 className="w-4 h-4 text-primary" />
                              </button>
                              <button className="p-2 hover:bg-destructive/10 rounded-lg transition-colors">
                                <Trash2 className="w-4 h-4 text-destructive" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add Activity Button */}
                  <button className="w-full mt-4 py-3 border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 rounded-xl transition-all flex items-center justify-center gap-2 text-muted-foreground hover:text-primary">
                    <Plus className="w-5 h-5" />
                    Add Activity
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Add New Day */}
            <button className="w-full mt-6 py-4 bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-dashed border-primary/30 hover:border-primary rounded-2xl transition-all flex items-center justify-center gap-2 text-primary font-semibold">
              <Plus className="w-5 h-5" />
              Add Another Day
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
