# Tripverse API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Auth Endpoints

### Register User
**POST** `/auth/register`

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Login User
**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

---

## Destination Endpoints

### Get All Destinations
**GET** `/destinations?page=1&limit=12&category=beach`

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 12)
- `category` (optional): Filter by category
- `search` (optional): Search query

**Response (200):**
```json
{
  "success": true,
  "destinations": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Bali Beach Resort",
      "description": "Beautiful beach destination...",
      "category": "beach",
      "location": {
        "country": "Indonesia",
        "city": "Bali",
        "lat": -8.6705,
        "lng": 115.2126
      },
      "basePrice": 1500,
      "rating": 4.5,
      "reviewCount": 245,
      "duration": 5,
      "images": ["url1", "url2"],
      "highlights": ["Swimming", "Diving", "Relaxation"]
    }
  ],
  "pagination": {
    "total": 50,
    "page": 1,
    "limit": 12,
    "pages": 5
  }
}
```

### Get Destination by ID
**GET** `/destinations/:id`

**Response (200):**
```json
{
  "success": true,
  "destination": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Bali Beach Resort",
    // ... full destination object
  }
}
```

---

## Booking Endpoints

### Create Booking
**POST** `/bookings` (requires auth)

**Request Body:**
```json
{
  "destinationId": "507f1f77bcf86cd799439011",
  "startDate": "2024-06-15",
  "endDate": "2024-06-20",
  "numberOfPeople": 2,
  "passengers": [
    {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "phone": "+1234567890"
    },
    {
      "firstName": "Jane",
      "lastName": "Doe",
      "email": "jane@example.com",
      "phone": "+0987654321"
    }
  ],
  "specialRequests": "Window seat preference"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Booking created successfully",
  "booking": {
    "_id": "507f1f77bcf86cd799439011",
    "userId": "507f1f77bcf86cd799439012",
    "destinationId": "507f1f77bcf86cd799439011",
    "startDate": "2024-06-15T00:00:00.000Z",
    "endDate": "2024-06-20T00:00:00.000Z",
    "numberOfPeople": 2,
    "totalPrice": 3000,
    "status": "pending",
    "passengers": [...]
  }
}
```

### Get User Bookings
**GET** `/bookings?page=1&limit=10` (requires auth)

**Response (200):**
```json
{
  "success": true,
  "bookings": [...],
  "pagination": {
    "total": 5,
    "page": 1,
    "limit": 10,
    "pages": 1
  }
}
```

### Cancel Booking
**DELETE** `/bookings/:id` (requires auth)

**Response (200):**
```json
{
  "success": true,
  "message": "Booking cancelled successfully",
  "booking": {...}
}
```

---

## Review Endpoints

### Create Review
**POST** `/reviews` (requires auth)

**Request Body:**
```json
{
  "destinationId": "507f1f77bcf86cd799439011",
  "rating": 5,
  "comment": "Amazing experience! The resort was beautiful and staff was very helpful.",
  "images": ["url1", "url2"]
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Review created successfully",
  "review": {
    "_id": "507f1f77bcf86cd799439011",
    "userId": {...},
    "destinationId": "507f1f77bcf86cd799439011",
    "rating": 5,
    "comment": "Amazing experience!...",
    "helpful": 0,
    "verified": true,
    "createdAt": "2024-05-14T10:30:00.000Z"
  }
}
```

### Get Destination Reviews
**GET** `/reviews/destination/:destinationId?page=1&limit=10`

**Response (200):**
```json
{
  "success": true,
  "reviews": [...],
  "pagination": {
    "total": 50,
    "page": 1,
    "limit": 10,
    "pages": 5
  }
}
```

---

## Payment Endpoints

### Create Payment Intent
**POST** `/payments/create-intent` (requires auth)

**Request Body:**
```json
{
  "bookingId": "507f1f77bcf86cd799439011",
  "amount": 3000
}
```

**Response (200):**
```json
{
  "success": true,
  "clientSecret": "pi_1234_secret_5678",
  "paymentIntentId": "pi_1234567890"
}
```

### Confirm Payment
**POST** `/payments/confirm` (requires auth)

**Request Body:**
```json
{
  "bookingId": "507f1f77bcf86cd799439011",
  "paymentIntentId": "pi_1234567890",
  "transactionId": "txn_1234567890"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Payment confirmed successfully",
  "payment": {
    "_id": "507f1f77bcf86cd799439011",
    "bookingId": "507f1f77bcf86cd799439011",
    "userId": "507f1f77bcf86cd799439012",
    "amount": 3000,
    "currency": "USD",
    "status": "completed",
    "transactionId": "txn_1234567890"
  }
}
```

---

## Error Responses

### Bad Request (400)
```json
{
  "success": false,
  "error": "Email and password are required"
}
```

### Unauthorized (401)
```json
{
  "success": false,
  "error": "Invalid credentials"
}
```

### Not Found (404)
```json
{
  "success": false,
  "error": "Destination not found"
}
```

### Conflict (409)
```json
{
  "success": false,
  "error": "Email already registered"
}
```

### Internal Server Error (500)
```json
{
  "success": false,
  "error": "Internal server error"
}
```

---

## Rate Limiting

- **Limit**: 100 requests per 15 minutes per IP
- **Header**: `X-RateLimit-Remaining`

---

## Common Query Parameters

### Pagination
- `page` (default: 1)
- `limit` (default: 10)

### Filters
- `category` - Filter by category
- `status` - Filter by status
- `search` - Text search

---

## Status Codes Reference

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Auth required |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 409 | Conflict - Resource already exists |
| 500 | Server Error - Internal error |

---

## Best Practices

1. **Always include Authorization header** for protected routes
2. **Validate input** on client side before sending
3. **Handle errors** gracefully in your frontend
4. **Use pagination** for list endpoints
5. **Cache responses** when appropriate
6. **Implement retry logic** for payment operations
