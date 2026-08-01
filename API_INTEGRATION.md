# RentNest Frontend API Integration Documentation

## Overview
This document maps all frontend components and pages to their corresponding backend API endpoints and outlines the error handling strategy across the application.

## Architecture

```
Frontend (Next.js 16) → Middleware (Authentication) → API Routes → Backend Services
```

---

## Frontend Components & API Endpoints

### Authentication Pages

#### Login Page
- **File**: `app/(authGroup)/login/page.tsx`
- **Component**: `LoginForm`
- **Backend Endpoint**: `POST /auth/login`
- **Payload**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**: Authentication token, User profile, Role

#### Register Page
- **File**: `app/(authGroup)/register/page.tsx`
- **Component**: `RegisterForm`
- **Backend Endpoint**: `POST /auth/register`
- **Payload**:
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "TENANT" | "LANDLORD"
  }
  ```
- **Response**: Authentication token, User profile

---

### Public Pages

#### Home Page
- **File**: `app/(publicGroup)/page.tsx`
- **Dependencies**: No backend calls (static content)
- **Features**: 
  - Navigation with auth state
  - Hero section with CTAs
  - Feature cards
  - Statistics section
  - Footer

#### Properties Listing
- **File**: `app/(publicGroup)/properties/page.tsx`
- **Backend Endpoint**: `GET /properties?page=1&limit=12&city=&filter=`
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "data": [
        {
          "id": "property-123",
          "title": "Cozy Apartment",
          "price": 1250,
          "city": "New York",
          "bedrooms": 2,
          "bathrooms": 1,
          "area": 850,
          "images": ["url1", "url2"],
          "landlord": { "name": "John Doe" },
          "averageRating": 4.5,
          "totalReviews": 12
        }
      ],
      "total": 100,
      "page": 1
    }
  }
  ```

#### Property Details
- **File**: `app/(publicGroup)/properties/[id]/page.tsx`
- **Backend Endpoint**: `GET /properties/{id}`
- **Response**: Complete property details with images, reviews, landlord info

---

### Tenant Dashboard

#### Tenant Dashboard Home
- **File**: `app/(dashboardGroup)/dashboard/page.tsx`
- **Backend Endpoints**:
  - `GET /rentals?status=all` - Fetch rental requests
  - `GET /payments?status=all` - Fetch payments
- **Components**:
  - Metric cards (statistics)
  - Recent rental requests
  - Recent payments
  - Payment status summary
  - Rental status summary

#### Rental Requests
- **File**: `app/(dashboardGroup)/dashboard/rental-requests/page.tsx`
- **Backend Endpoint**: `GET /rentals?page=1&limit=10&status=`
- **Features**: Table view, status filtering, action buttons

#### Rental Request Details
- **File**: `app/(dashboardGroup)/dashboard/rental-requests/[id]/page.tsx`
- **Backend Endpoint**: `GET /rentals/{id}`
- **Response**: Full rental details, timeline, landlord info

#### Payments
- **File**: `app/(dashboardGroup)/dashboard/payments/page.tsx`
- **Backend Endpoint**: `GET /payments?page=1&limit=10&status=`
- **Features**: Payment history, filters, download receipts

#### Payment Details
- **File**: `app/(dashboardGroup)/dashboard/payments/[id]/page.tsx`
- **Backend Endpoint**: `GET /payments/{id}`
- **Response**: Payment details, invoice, receipt

#### Payment Success
- **File**: `app/(dashboardGroup)/dashboard/payments/success/page.tsx`
- **Triggered By**: Stripe redirect after successful payment
- **Query Params**: `?status=success&sessionId=cs_live_xxx`
- **Backend Endpoint**: `POST /payments/{paymentId}/confirm`
- **Action**: Update payment status to COMPLETED

#### Payment Cancel
- **File**: `app/(dashboardGroup)/dashboard/payments/cancel/page.tsx`
- **Triggered By**: User cancels Stripe checkout
- **Display**: Cancellation message, retry options

---

### Landlord Dashboard

#### Landlord Dashboard Home
- **File**: `app/(dashboardGroup)/landlord-dashboard/page.tsx`
- **Backend Endpoints**:
  - `GET /landlord/properties` - Landlord's properties
  - `GET /landlord/rental-requests` - Incoming rental requests
  - `GET /landlord/revenue` - Revenue statistics
- **Features**: Property list, requests pending, revenue tracking

#### Landlord Properties
- **File**: `app/(dashboardGroup)/landlord-dashboard/properties/page.tsx`
- **Backend Endpoint**: `GET /landlord/properties?page=1&limit=10`
- **Features**: Create property, edit, delete, view details

#### Landlord Rental Requests
- **File**: `app/(dashboardGroup)/landlord-dashboard/rental-requests/page.tsx`
- **Backend Endpoint**: `GET /landlord/rental-requests?status=PENDING`
- **Actions**: 
  - `PUT /landlord/rental-requests/{id}/approve`
  - `PUT /landlord/rental-requests/{id}/reject`

---

### Admin Dashboard

#### Admin Dashboard Home
- **File**: `app/(dashboardGroup)/admin-dashboard/page.tsx`
- **Backend Endpoints**:
  - `GET /admin/statistics` - Global stats
  - `GET /admin/users` - All users
  - `GET /admin/properties` - All properties
  - `GET /admin/rentals` - All rentals
- **Features**: System overview, KPIs, recent activities

#### Admin Users Management
- **File**: `app/(dashboardGroup)/admin-dashboard/users/page.tsx`
- **Backend Endpoint**: `GET /admin/users?page=1&limit=20&role=&status=`
- **Actions**:
  - `PUT /admin/users/{id}/ban`
  - `PUT /admin/users/{id}/unban`
  - `DELETE /admin/users/{id}`

#### Admin Properties Management
- **File**: `app/(dashboardGroup)/admin-dashboard/properties/page.tsx`
- **Backend Endpoint**: `GET /admin/properties?page=1&limit=20`
- **Actions**:
  - `PUT /admin/properties/{id}/approve`
  - `PUT /admin/properties/{id}/reject`
  - `DELETE /admin/properties/{id}`

#### Admin Rentals Management
- **File**: `app/(dashboardGroup)/admin-dashboard/rentals/page.tsx`
- **Backend Endpoint**: `GET /admin/rentals?page=1&limit=20&status=`
- **Actions**: View details, resolve disputes, manage payments

---

## Payment Integration

### Stripe Integration

#### Create Checkout Session
- **File**: `app/api/payments/create-checkout/route.ts`
- **Method**: `POST`
- **Endpoint**: `/api/payments/create-checkout`
- **Payload**:
  ```json
  {
    "paymentId": "rental-123",
    "amount": 1250,
    "currency": "usd",
    "tenantEmail": "tenant@example.com",
    "propertyTitle": "Cozy Apartment"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "sessionId": "cs_live_xxx",
    "url": "https://checkout.stripe.com/pay/cs_live_xxx"
  }
  ```

#### Stripe Webhook
- **File**: `app/api/webhooks/stripe/route.ts`
- **Method**: `POST`
- **Endpoint**: `/api/webhooks/stripe`
- **Handled Events**:
  - `checkout.session.completed` - Update payment status
  - `charge.succeeded` - Log successful charge
  - `charge.failed` - Log failed charge
  - `payment_intent.succeeded` - Process completed payment
  - `payment_intent.payment_failed` - Handle failed payment

#### Payment Component
- **File**: `app/(dashboardGroup)/_components/_tenant/PayNowButton.tsx`
- **Integration**: Calls `/api/payments/create-checkout` and redirects to Stripe

---

## Error Handling Strategy

### Error Types

#### 1. API Errors (4xx, 5xx)
- **Source**: Backend API responses
- **Handler**: `lib/error-handler.ts`
- **Strategy**:
  - Extract error message from response
  - Show user-friendly toast notification
  - Log error to console for debugging

#### 2. Validation Errors (400)
- **Source**: Form validation failures
- **Display**: Inline form errors on input fields
- **Toast**: Shows field-specific error messages

#### 3. Authentication Errors (401)
- **Source**: Expired token, unauthorized access
- **Action**: Redirect to `/login`
- **Message**: "Session expired. Please login again."

#### 4. Authorization Errors (403)
- **Source**: Insufficient permissions
- **Action**: Redirect to `/dashboard`
- **Message**: "You don't have permission to access this resource."

#### 5. Network Errors
- **Source**: Connection failures
- **Handler**: Try-catch blocks
- **Display**: Retry option in toast

#### 6. Runtime Errors
- **Source**: Component errors, undefined properties
- **Handler**: Error Boundary component
- **Display**: Error page with retry button

### Error Display Components

#### Toast Notifications
```typescript
import { toast } from "sonner";

// Success
toast.success("Payment completed successfully!");

// Error
toast.error("Payment failed. Please try again.");

// Warning
toast.warning("Please fill all required fields");

// Info
toast.info("Processing your request...");
```

#### Inline Form Errors
```tsx
{errors.email && (
  <span className="text-sm text-destructive">{errors.email}</span>
)}
```

#### Error Boundary
- **File**: `components/ErrorBoundary.tsx`
- **Usage**: Wraps client components
- **Display**: Error details, retry button, home link

### Error Handling in API Routes

#### Create Checkout Session
```typescript
try {
  const session = await createCheckoutSession({...});
  return NextResponse.json({success: true, sessionId: session.id});
} catch (error) {
  console.error('[v0] Error:', error);
  return NextResponse.json({error: 'Failed to create session'}, {status: 500});
}
```

#### Webhook Handler
```typescript
try {
  const event = verifyWebhookSignature(body, signature, secret);
  // Handle event
} catch (error) {
  console.error('[v0] Webhook verification failed:', error);
  return NextResponse.json({error: 'Verification failed'}, {status: 400});
}
```

---

## Middleware & Authentication

### Middleware File
- **File**: `proxy.ts`
- **Purpose**: 
  - Verify JWT tokens
  - Route-based access control
  - Redirect to login if unauthorized

### Protected Routes
- All routes under `/(dashboardGroup)/` require authentication
- Admin routes require `role === 'ADMIN'`
- Landlord routes require `role === 'LANDLORD'`
- Tenant routes require `role === 'TENANT'`

---

## Testing Credentials

### Admin Account
- **Email**: admin@rentnest.com
- **Password**: Admin@123456
- **Role**: ADMIN

### Landlord Account
- **Email**: landlord@rentnest.com
- **Password**: Landlord@123456
- **Role**: LANDLORD

### Tenant Account
- **Email**: tenant@rentnest.com
- **Password**: Tenant@123456
- **Role**: TENANT

### Test Stripe Cards
- **Success**: 4242 4242 4242 4242
- **Declined**: 4000 0000 0000 0002
- **Expiry**: Any future date (MM/YY)
- **CVC**: Any 3 digits

---

## Environment Variables Required

```env
# Stripe
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Backend API
NEXT_PUBLIC_API_URL=http://localhost:5000

# JWT
JWT_SECRET=your_jwt_secret_key
```

---

## Frontend State Management

### User State
- **Source**: Initial fetch from `GET /auth/me`
- **Storage**: JWT token in cookies (httpOnly)
- **Update**: On login, register, logout

### Cache Strategy
- **Properties**: Cached for 5 minutes
- **Payments**: No cache (real-time updates)
- **User Profile**: Cache on load, invalidate on update

---

## Performance Optimizations

### Code Splitting
- Dashboard pages: Lazy loaded
- Payment components: Separate chunk
- Admin pages: Separate chunk

### Image Optimization
- Use Next.js Image component
- WebP format with fallbacks
- Responsive sizes

### API Caching
- Use SWR for data fetching
- Revalidate on focus
- Manual mutation on updates

---

## Common API Response Format

### Success Response
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Operation successful",
  "data": { }
}
```

### Error Response
```json
{
  "success": false,
  "statusCode": 400,
  "message": "Validation failed",
  "errors": {
    "email": ["Email is required", "Email format is invalid"]
  }
}
```

---

## Deployment Checklist

- [ ] Set all environment variables
- [ ] Configure Stripe webhooks endpoint
- [ ] Enable CORS for API domain
- [ ] Set secure cookie flags
- [ ] Enable rate limiting on auth endpoints
- [ ] Configure CDN for image serving
- [ ] Set up error tracking (e.g., Sentry)
- [ ] Enable compression middleware
- [ ] Configure CSP headers
- [ ] Test all payment flows
- [ ] Verify admin accounts work
- [ ] Check email notifications
- [ ] Test error boundary with manual error
- [ ] Verify 404 and error pages
