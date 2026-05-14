# Tripverse Backend API

A comprehensive backend API for the Tripverse travel booking platform built with Node.js, Express, TypeScript, and MongoDB.

## Features

- **User Management**: Registration, login, profile management
- **Destination Management**: CRUD operations for travel destinations
- **Booking System**: Create, update, and manage travel bookings
- **Payment Integration**: Stripe payment processing
- **Reviews & Ratings**: User reviews and destination ratings
- **Itinerary Planning**: Create and manage travel itineraries
- **Authentication**: JWT-based authentication
- **Authorization**: Role-based access control (User/Admin)
- **Error Handling**: Comprehensive error handling and validation

## Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (jsonwebtoken)
- **Encryption**: bcryptjs
- **Payment**: Stripe
- **Validation**: validator.js
- **Security**: Helmet, CORS, Rate Limiting

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn or pnpm
- MongoDB (local or Atlas)
- Stripe account (for payment processing)

## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd tripverse-backend
```

2. Install dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create `.env` file
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`
```
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/tripverse
# OR for MongoDB Atlas
MONGODB_ATLAS_URI=mongodb+srv://user:password@cluster.mongodb.net/tripverse

# JWT
JWT_SECRET=your_jwt_secret_key_change_in_production
JWT_EXPIRE=7d

# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key

# CORS
CORS_ORIGIN=http://localhost:3000,http://localhost:5173
```

## Running the Server

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)
- `POST /api/auth/refresh-token` - Refresh JWT token
- `POST /api/auth/logout` - Logout user

### Users
- `GET /api/users/profile` - Get user profile
- `PATCH /api/users/profile` - Update profile
- `PATCH /api/users/password` - Change password
- `DELETE /api/users/account` - Delete account
- `GET /api/users` - Get all users (admin only)

### Destinations
- `GET /api/destinations` - Get all destinations (with pagination)
- `GET /api/destinations/:id` - Get destination by ID
- `GET /api/destinations/search?query=...` - Search destinations
- `GET /api/destinations/category/:category` - Get destinations by category
- `POST /api/destinations` - Create destination (admin only)
- `PATCH /api/destinations/:id` - Update destination (admin only)
- `DELETE /api/destinations/:id` - Delete destination (admin only)

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get user's bookings
- `GET /api/bookings/:id` - Get booking by ID
- `PATCH /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Cancel booking
- `GET /api/bookings/all` - Get all bookings (admin only)

### Reviews
- `POST /api/reviews` - Create review
- `GET /api/reviews/user` - Get user's reviews
- `GET /api/reviews/destination/:destinationId` - Get destination reviews
- `PATCH /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review
- `PATCH /api/reviews/:id/helpful` - Mark review as helpful

### Itineraries
- `POST /api/itineraries` - Create itinerary
- `GET /api/itineraries` - Get user's itineraries
- `GET /api/itineraries/:id` - Get itinerary by ID
- `GET /api/itineraries/public` - Get public itineraries
- `PATCH /api/itineraries/:id` - Update itinerary
- `DELETE /api/itineraries/:id` - Delete itinerary
- `POST /api/itineraries/:itineraryId/destinations` - Add destination to itinerary

### Payments
- `POST /api/payments/create-intent` - Create payment intent
- `POST /api/payments/confirm` - Confirm payment
- `GET /api/payments` - Get payment history
- `GET /api/payments/:id` - Get payment by ID
- `POST /api/payments/refund` - Refund payment

## Project Structure

```
src/
├── config/              # Configuration files
│   └── database.ts      # MongoDB connection
├── controllers/         # Request handlers
├── middleware/          # Express middleware
│   ├── auth.ts         # Authentication middleware
│   └── errorHandler.ts # Error handling middleware
├── models/             # MongoDB schemas
├── routes/             # API routes
├── services/           # Business logic
├── types/              # TypeScript types
├── utils/              # Utility functions
└── server.ts           # Application entry point
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the `Authorization` header:

```
Authorization: Bearer <token>
```

## Error Handling

The API returns standardized error responses:

```json
{
  "success": false,
  "error": "Error message here"
}
```

HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `500` - Internal Server Error

## Database Models

### User
- firstName, lastName, email, phone
- password (hashed)
- role (user/admin)
- profileImage
- timestamps

### Destination
- name, description, category
- location (country, city, lat, lng)
- images, highlights, bestTimeToVisit
- basePrice, duration
- rating, reviewCount
- availability (slots, dates)

### Booking
- userId, destinationId
- startDate, endDate
- numberOfPeople, totalPrice
- status (pending/confirmed/cancelled/completed)
- passengers information
- timestamps

### Review
- userId, destinationId
- rating (1-5), comment
- images, helpful count
- verified status

### Itinerary
- userId, title, description
- destinations array with order and dates
- isPublic flag

### Payment
- userId, bookingId
- amount, currency, paymentMethod
- status (pending/completed/failed/refunded)
- transactionId, stripePaymentIntentId

## Development

### Adding New Routes

1. Create controller in `src/controllers/`
2. Create route handler in `src/routes/`
3. Import and use in `src/server.ts`

### Database Queries

Models use Mongoose with TypeScript support. Example:

```typescript
const user = await User.findById(userId);
const destinations = await Destination.find({ category: 'beach' });
```

## Security Features

- JWT authentication with expiration
- Password hashing with bcryptjs
- CORS protection
- Helmet headers
- Rate limiting
- Input validation
- MongoDB injection prevention

## Deployment

### MongoDB Atlas

1. Create cluster on MongoDB Atlas
2. Add connection string to `.env` as `MONGODB_ATLAS_URI`
3. Whitelist your deployment IP

### Heroku / Cloud Platform

1. Set environment variables
2. Build TypeScript: `npm run build`
3. Start with: `npm start`

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

MIT License

## Support

For issues or questions, please create an issue in the repository.

---

**Note**: Make sure to never commit your `.env` file with sensitive credentials to version control.
