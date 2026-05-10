import { Link, useParams } from "react-router";
import { Star, MapPin, Calendar, Users, Heart, Share2, Clock, Wifi, Coffee, ExternalLink, Hotel, Navigation } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { indianDestinations, indianReviews } from "../data/destinations";

function getItineraryForDestination(name: string, duration: string) {
  const days = parseInt(duration);

  const itineraries: Record<string, any[]> = {
    "Goa": [
      { day: 1, title: "Arrival & Beach Time", activities: ["Airport pickup", `Check-in at hotel`, "Welcome drink", "Evening at Calangute Beach", "Beachside dinner"] },
      { day: 2, title: "North Goa Exploration", activities: ["Fort Aguada visit", "Anjuna Beach", "Lunch at beach shack", "Chapora Fort (Dil Chahta Hai fort)", "Vagator Beach sunset"] },
      { day: 3, title: "South Goa & Culture", activities: ["Basilica of Bom Jesus", "Se Cathedral", "Spice plantation tour", "Traditional Goan lunch", "Palolem Beach"] },
      { day: 4, title: "Water Sports & Relaxation", activities: ["Water sports at Baga Beach", "Dolphin spotting cruise", "Beach club lunch", "Spa session", "Casino night (optional)"] },
      { day: 5, title: "Departure", activities: ["Leisure morning", "Last-minute shopping at Mapusa Market", "Check-out", "Airport transfer"] },
    ],
    "Jaipur": [
      { day: 1, title: "Arrival & City Introduction", activities: ["Airport pickup", "Check-in at hotel", "Hawa Mahal photo stop", "City Palace visit", "Local Rajasthani dinner"] },
      { day: 2, title: "Amber Fort & Heritage", activities: ["Amber Fort with elephant/jeep ride", "Jal Mahal photo stop", "Lunch at traditional restaurant", "Jantar Mantar", "Evening at Chokhi Dhani village resort"] },
      { day: 3, title: "Shopping & Culture", activities: ["Jaigarh Fort", "Johari Bazaar shopping", "Bapu Bazaar", "Block printing workshop", "Light & Sound show at Amber Fort"] },
      { day: 4, title: "Departure", activities: ["Albert Hall Museum", "Last-minute shopping", "Check-out", "Airport transfer"] },
    ],
    "Manali": [
      { day: 1, title: "Arrival & Acclimatization", activities: ["Airport/Bus stand pickup", "Check-in at hotel", "Rest and acclimatize", "Evening walk at Mall Road", "Dinner at hotel"] },
      { day: 2, title: "Solang Valley Adventure", activities: ["Solang Valley visit", "Paragliding/Zorbing/skiing (seasonal)", "Rohtang Pass excursion", "Photo opportunities", "Return to hotel"] },
      { day: 3, title: "Local Sightseeing", activities: ["Hadimba Devi Temple", "Manu Temple", "Vashisht hot springs", "Old Manali cafes", "Tibetan Monastery"] },
      { day: 4, title: "Kasol Day Trip", activities: ["Drive to Kasol", "Parvati Valley exploration", "Manikaran Sahib visit", "Riverside lunch", "Return to Manali"] },
      { day: 5, title: "Adventure Activities", activities: ["River rafting in Beas", "Trekking to Jogini Falls", "Apple orchard visit", "Shopping for woollens", "Bonfire evening"] },
      { day: 6, title: "Departure", activities: ["Leisure morning", "Check-out", "Transfer to airport/bus stand", "Departure with memories"] },
    ],
  };

  return itineraries[name] || [
    { day: 1, title: "Arrival & Check-in", activities: ["Airport/Railway pickup", "Hotel check-in", "Welcome refreshments", "Local area exploration", "Dinner at hotel"] },
    { day: 2, title: "Full Day Sightseeing", activities: ["Breakfast", "Major attractions visit", "Local lunch", "Cultural experiences", "Evening at leisure"] },
    { day: 3, title: "Adventure & Activities", activities: ["Activity based on destination", "Guided tour", "Local cuisine tasting", "Photo opportunities", "Shopping"] },
    { day: 4, title: "Departure", activities: ["Breakfast", "Check-out", "Last-minute shopping", "Transfer to airport/railway", "Departure"] },
  ].slice(0, days);
}

function getNearbyPlaces(name: string) {
  const nearby: Record<string, any[]> = {
    "Goa": [
      { name: "Dudhsagar Waterfalls", distance: "60 km", image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=200&fit=crop" },
      { name: "Aguada Fort", distance: "18 km", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=300&h=200&fit=crop" },
      { name: "Butterfly Beach", distance: "25 km", image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=200&fit=crop" },
    ],
    "Jaipur": [
      { name: "Pushkar", distance: "145 km", image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=300&h=200&fit=crop" },
      { name: "Ajmer Sharif", distance: "132 km", image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=300&h=200&fit=crop" },
      { name: "Abhaneri Stepwell", distance: "95 km", image: "https://images.unsplash.com/photo-1609920658906-8223bd289001?w=300&h=200&fit=crop" },
    ],
    "Manali": [
      { name: "Rohtang Pass", distance: "51 km", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop" },
      { name: "Kasol", distance: "75 km", image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=300&h=200&fit=crop" },
      { name: "Manikaran", distance: "80 km", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=300&h=200&fit=crop" },
    ],
  };

  return nearby[name] || [
    { name: "Local attraction 1", distance: "10 km", image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=200&fit=crop" },
    { name: "Local attraction 2", distance: "25 km", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=300&h=200&fit=crop" },
    { name: "Local attraction 3", distance: "35 km", image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=300&h=200&fit=crop" },
  ];
}

export function DestinationDetails() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");

  const destinationData = indianDestinations.find(d => d.id === parseInt(id || "1")) || indianDestinations[0];

  const destination = {
    ...destinationData,
    description: destinationData.description,
    duration: `${destinationData.duration} / ${parseInt(destinationData.duration) - 1} nights`,
    category: destinationData.category.charAt(0).toUpperCase() + destinationData.category.slice(1),
    images: [
      destinationData.image,
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop",
    ],
    included: [
      `${destinationData.hotel.stars}-star accommodation at ${destinationData.hotel.name}`,
      ...destinationData.hotel.amenities.map(a => a + " available"),
      "Daily breakfast buffet",
      "Airport/Railway pickup & drop",
      "Professional tour guide",
      "All sightseeing as per itinerary"
    ],
    itinerary: getItineraryForDestination(destinationData.name, destinationData.duration),
    nearby: getNearbyPlaces(destinationData.name),
    weather: { temp: "25°C", condition: "Pleasant", humidity: "65%", wind: "10 km/h" },
  };

  const reviews = indianReviews;

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "hotel", label: "Hotel Details" },
    { id: "itinerary", label: "Itinerary" },
    { id: "included", label: "What's Included" },
    { id: "reviews", label: "Reviews" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-[500px]">
        <div className="relative h-[300px] md:h-[500px]">
          <img src={destination.images[0]} alt={destination.name} className="w-full h-full object-cover" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {destination.images.slice(1).map((image, index) => (
            <div key={index} className="relative h-[150px] md:h-[248px]">
              <img src={image} alt={`${destination.name} ${index + 2}`} className="w-full h-full object-cover" />
              {index === 2 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer hover:bg-black/60 transition-colors">
                  <span className="text-white font-semibold">View All Photos</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-2">
                    {destination.category}
                  </span>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">{destination.name}</h1>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-foreground">{destination.rating}</span>
                      <span>({destination.reviews.toLocaleString('en-IN')} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{destination.state}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="w-10 h-10 rounded-full bg-muted hover:bg-primary/10 flex items-center justify-center transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-muted hover:bg-primary/10 flex items-center justify-center transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-border mb-6">
              <div className="flex gap-8 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-4 text-sm font-medium whitespace-nowrap transition-colors ${
                      activeTab === tab.id
                        ? "text-primary border-b-2 border-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div>
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">About This Trip</h2>
                    <p className="text-foreground/80 leading-relaxed">{destination.description}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-4">Nearby Attractions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {destination.nearby.map((place, index) => (
                        <div key={index} className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer">
                          <img src={place.image} alt={place.name} className="w-full h-32 object-cover" />
                          <div className="p-4 bg-card">
                            <h4 className="font-semibold mb-1">{place.name}</h4>
                            <p className="text-sm text-muted-foreground">{place.distance} away</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "hotel" && (
                <div className="space-y-6">
                  <div className="bg-card rounded-2xl p-6 shadow-lg">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                        <Hotel className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold mb-2">{destinationData.hotel.name}</h2>
                        <div className="flex items-center gap-2 mb-3">
                          {[...Array(destinationData.hotel.stars)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                          <span className="text-sm text-muted-foreground ml-1">Luxury Hotel</span>
                        </div>
                        <div className="flex items-start gap-2 text-muted-foreground mb-3">
                          <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                          <span className="text-sm">{destinationData.hotel.address}</span>
                        </div>
                        <a
                          href={destinationData.hotel.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm"
                        >
                          <Navigation className="w-4 h-4" />
                          View on Google Maps
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-4">Hotel Amenities</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {destinationData.hotel.amenities.map((amenity, index) => (
                          <div key={index} className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                            <Wifi className="w-4 h-4 text-primary" />
                            <span className="text-sm">{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                      <p className="text-sm text-blue-900">
                        <strong>Note:</strong> Hotel location on Google Maps will help you plan your travel better and explore nearby attractions.
                      </p>
                    </div>
                  </div>

                  {/* Embedded Google Map */}
                  <div className="bg-card rounded-2xl overflow-hidden shadow-lg">
                    <iframe
                      src={`https://www.google.com/maps?q=${destinationData.hotel.lat},${destinationData.hotel.lng}&hl=en&z=14&output=embed`}
                      width="100%"
                      height="400"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`Map of ${destinationData.hotel.name}`}
                    ></iframe>
                  </div>
                </div>
              )}

              {activeTab === "itinerary" && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold mb-4">Day by Day Itinerary</h2>
                  {destination.itinerary.map((day) => (
                    <div key={day.day} className="bg-card rounded-xl p-6 shadow-sm">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                          {day.day}
                        </div>
                        <h3 className="text-lg font-bold">{day.title}</h3>
                      </div>
                      <ul className="space-y-2 ml-15">
                        {day.activities.map((activity, index) => (
                          <li key={index} className="flex items-start gap-2 text-foreground/80">
                            <Clock className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                            <span>{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "included" && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">What's Included</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {destination.included.map((item, index) => (
                      <div key={index} className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Coffee className="w-5 h-5 text-primary" />
                        </div>
                        <span className="font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-8 mb-8">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-primary mb-2">{destination.rating}</div>
                      <div className="flex gap-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <div className="text-sm text-muted-foreground">{destination.reviews.toLocaleString('en-IN')} reviews</div>
                    </div>
                    <div className="flex-1 space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center gap-3">
                          <span className="text-sm w-12">{rating} star</span>
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${rating * 18}%` }}></div>
                          </div>
                          <span className="text-sm text-muted-foreground w-12 text-right">{rating * 18}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="bg-card rounded-xl p-6 shadow-sm">
                        <div className="flex items-start gap-4">
                          <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full object-cover" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h4 className="font-semibold">{review.name}</h4>
                                <p className="text-sm text-muted-foreground">{review.location} • {review.date}</p>
                              </div>
                              <div className="flex gap-1">
                                {[...Array(review.rating)].map((_, i) => (
                                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                            </div>
                            <p className="text-foreground/80">{review.text}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-card rounded-2xl shadow-xl p-6 border border-border">
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-bold text-primary">₹{destination.price.toLocaleString('en-IN')}</span>
                    <span className="text-muted-foreground">/ person</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{destination.duration}</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Check-in Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="date"
                        className="w-full pl-11 pr-4 py-3 bg-input-background border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Guests</label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <select className="w-full pl-11 pr-4 py-3 bg-input-background border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/50">
                        <option>1 Guest</option>
                        <option>2 Guests</option>
                        <option>3 Guests</option>
                        <option>4 Guests</option>
                        <option>5+ Guests</option>
                      </select>
                    </div>
                  </div>
                </div>

                <Link to={`/booking/${id}`}>
                  <button className="w-full py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold hover:shadow-lg transition-all mb-4">
                    Book Now
                  </button>
                </Link>

                <p className="text-center text-sm text-muted-foreground mb-6">You won't be charged yet</p>

                <div className="border-t border-border pt-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <Wifi className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm">Free Wi-Fi included</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Hotel className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm">{destinationData.hotel.stars}-star hotel stay</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Coffee className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm">Daily breakfast included</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
