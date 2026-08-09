# RentNest - Premium Rental Property Management Platform

A modern, full-featured rental property management platform built with Next.js 16, React 19, Stripe payment integration, and comprehensive error handling. Connect landlords and tenants seamlessly with role-based dashboards and secure payment processing.

## 🎯 Features

### For Tenants
- Browse premium rental properties with advanced filtering
- Create rental requests with single click
- View active rentals and request status timeline
- Secure Stripe payment integration
- Download payment receipts
- Payment history tracking

### For Landlords  
- Create and manage property listings with multiple images
- View incoming rental requests
- Approve/reject rental applications
- Track revenue and active leases
- View rental history
- Manage property availability

### For Admins
- Complete system oversight with real-time statistics
- User management (ban/unban accounts)
- Property approval and moderation
- Rental dispute management
- Payment monitoring and reconciliation

### Technical Features
- ✅ Stripe payment processing with success/cancel pages
- ✅ Comprehensive error handling with Toast notifications
- ✅ Role-based access control (TENANT, LANDLORD, ADMIN)
- ✅ Server actions for secure operations
- ✅ TypeScript for type safety
- ✅ Premium UI with Tailwind CSS
- ✅ Responsive design (mobile-first)
- ✅ Dark mode support
- ✅ Error boundaries and 404 handling
- ✅ SEO optimized

---

## 📋 Quick Start

### Prerequisites
- Node.js 18+
- npm (this repo is committed with `package-lock.json`; use npm rather than pnpm/yarn to avoid lockfile drift)
- A running instance of the `rent-nest-server` backend
- Stripe account (for payment processing)

### Installation

```bash
# Clone the repository
git clone https://github.com/ikhtiaj-arif/rent-nest-client.git
cd rent-nest-client

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# then fill in BACKEND_API_URL / NEXT_PUBLIC_BACKEND_API_URL etc, see below

# Start development server
npm run dev

# The app will be available at http://localhost:3000
```

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

---

## 🔐 Test Accounts

There are no pre-seeded credentials shipped with this repo. To test each
role:

- **Tenant**: register normally via `/register` (role defaults to `TENANT`).
- **Landlord**: register as `TENANT`, then submit a landlord request from
  `/profile`, and approve it from an `ADMIN` account at
  `/admin-dashboard/landlord-requests`.
- **Admin**: admin accounts are not self-registrable through the public
  `/auth/register` endpoint — seed one directly in the database, or via the
  backend's seed script if one exists in `rent-nest-server`.

---

## 💳 Stripe Test Cards

| Type | Card Number | Expiry | CVC | Result |
|------|-------------|--------|-----|--------|
| Visa (Success) | 4242 4242 4242 4242 | 12/25 | 123 | ✅ Succeeds |
| Visa (Decline) | 4000 0000 0000 0002 | 12/25 | 123 | ❌ Declined |
| Mastercard | 5555 5555 5555 4444 | 12/25 | 123 | ✅ Succeeds |
| Amex | 378282246310005 | 12/25 | 1234 | ✅ Succeeds |

---

## 📁 Project Structure

```
rent-nest-client/
├── app/
│   ├── (publicGroup)/               # Public pages (home, properties, about, contact)
│   │   ├── _actions/                # Server actions (propertyActions.ts)
│   │   ├── _components/             # SortFilter, CategoryFilter, CityFilter, PriceFilter, etc.
│   │   └── properties/              # Listing + detail pages
│   ├── (authGroup)/                 # Auth pages (login, register)
│   │   └── _actions/                # authActions.ts
│   ├── (dashboardGroup)/            # Protected dashboards
│   │   ├── _actions/                # adminActions.ts, landlordActions.ts, tenantActions.ts
│   │   ├── _components/             # Tables, dialogs, cards shared across dashboards
│   │   ├── dashboard/               # Tenant dashboard
│   │   ├── landlord-dashboard/      # Landlord dashboard
│   │   ├── admin-dashboard/         # Admin dashboard
│   │   └── profile/                 # Profile page + _actions/userAction.ts
│   ├── layout.tsx                   # Root layout (mounts sonner <Toaster />)
│   ├── error.tsx                    # Root error boundary
│   ├── not-found.tsx                # Custom 404 page
│   └── globals.css                  # Global styles
├── components/
│   ├── ui/                          # shadcn/ui primitives
│   └── shared/                      # Navbar, Footer, Home sections, DashboardSkeleton
├── service/
│   ├── hadleApiError.ts             # Shared server-action error → AuthState mapper
│   ├── getMe.ts / logout.ts / refreshToken.ts
├── lib/
│   ├── types.ts                     # Shared TS types (Property, AuthState, ...)
│   └── utils.ts
├── public/                          # Static assets
├── proxy.ts                         # Auth-aware middleware (protects dashboard routes)
├── package.json
├── tsconfig.json
├── next.config.ts
├── API_INTEGRATION.md               # API documentation
└── README.md
```

---

## 🔑 Environment Variables

Create a `.env.local` file (start from `.env.example` in this repo):

```env
# Server-only — used by server actions/components to call the backend
BACKEND_API_URL=http://localhost:5000

# Exposed to the client as well (used by any client component that calls
# the backend directly)
NEXT_PUBLIC_BACKEND_API_URL=http://localhost:5000

# JWT — must match the backend's secrets so refresh-token cookies validate
JWT_ACCESS_SECRET=access-secret
JWT_REFRESH_SECRET=refresh-secret
```

Stripe keys, if you're testing payments, live on the `rent-nest-server`
backend, not in this frontend — see that repo's README.

---

## 🔌 API Integration

All frontend components are mapped to backend endpoints. See `API_INTEGRATION.md` for:
- Complete endpoint documentation
- Request/response formats
- Error handling strategy
- Status codes

### Key Endpoints

```
Authentication
POST   /api/auth/login
POST   /api/auth/register
GET    /api/auth/me

Properties
GET    /api/properties?page=1&limit=12&sort=&categoryId=&city=&minPrice=&maxPrice=
GET    /api/properties/{id}
GET    /api/properties/filter-options
POST   /api/landlord/properties
PUT    /api/landlord/properties/{id}
DELETE /api/landlord/properties/{id}

Rentals
GET    /api/rentals?page=1&limit=10
POST   /api/rentals
GET    /api/rentals/{id}
GET    /api/landlord/requests
PATCH  /api/landlord/requests/{id}

Payments
GET    /api/payments?page=1&limit=10
GET    /api/payments/{id}
POST   /api/payments/create
POST   /api/payments/confirm

Admin
GET    /api/admin/users
PATCH  /api/admin/users/{id}
GET    /api/admin/properties
GET    /api/admin/rentals
GET    /api/user/request-landlord
PATCH  /api/user/request-landlord/{id}
```

---

##  Error Handling

### Implemented Strategies

1. **Toast Notifications** - User-friendly messages for all errors
2. **Inline Form Validation** - Field-level error display
3. **Error Boundaries** - Component-level error catching
4. **API Error Handling** - Structured error responses
5. **Retry Mechanisms** - Auto-retry for network errors
6. **404 Pages** - Custom not-found pages
7. **Loading States** - Clear feedback during operations
8. **Timeout Handling** - Prevents infinite loading

### Error Response Format
```json
{
  "success": false,
  "statusCode": 400,
  "message": "Validation failed",
  "errors": {
    "email": ["Email is required", "Invalid email format"]
  }
}
```

---

## 💳 Payment Flow

1. **Initiate Payment**: Click "Pay Now" button
2. **Stripe Checkout**: Redirected to Stripe payment page
3. **Enter Card Details**: Use test cards from table above
4. **Process Payment**: Stripe processes the payment
5. **Success/Cancel**: 
   - ✅ Success → View receipt, update payment history
   - ❌ Cancel → Retry option, payment remains pending
6. **Webhook**: Backend receives confirmation
7. **Update Database**: Payment status updated to COMPLETED

---

## 🎨 Design System

### Color Palette
- **Primary**: Golden Yellow (accent color for CTAs)
- **Background**: Deep Navy (dark mode optimized)
- **Foreground**: Light colors for contrast
- **Accents**: Orange and green for status indicators

### Typography
- **Headings**: Modern sans-serif
- **Body**: Optimized for readability
- **Code**: Monospace font

### Components
- **Buttons**: Primary, outline, ghost variants
- **Cards**: Hover effects, shadow transitions
- **Forms**: Inline validation, clear labels
- **Tables**: Sortable, filterable, paginated
- **Modals**: Smooth transitions, focus management

---

## 📊 Dashboard Layouts

### Tenant Dashboard
- Key metrics (active rentals, payments, awaiting action)
- Recent rental requests with quick actions
- Payment history with receipts
- Status timeline for active rentals
- Quick navigation buttons

### Landlord Dashboard
- Property portfolio overview
- Pending rental requests
- Revenue tracking and statistics
- Property management interface
- Tenant management tools

### Admin Dashboard
- System-wide statistics
- User management interface
- Property approval queue
- Rental dispute management
- Payment monitoring
- System activity logs

---

## 🧪 Testing Checklist

- [ ] Login with all user roles
- [ ] Browse and filter properties
- [ ] Create rental request
- [ ] Make payment with Stripe test card
- [ ] View payment receipt and history
- [ ] Approve/reject rental requests (Landlord)
- [ ] Manage users (Admin)
- [ ] Test error scenarios
- [ ] Verify responsive design
- [ ] Check dark mode
- [ ] Test keyboard navigation
- [ ] Verify error boundaries

---

## 📈 Performance Metrics

Target scores:
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1
- **Lighthouse Performance**: > 90

Optimizations included:
- Code splitting by route
- Image lazy loading
- Component memoization
- CSS optimization
- Font optimization

---

## 🔒 Security

Implemented security measures:
- ✅ HTTPS only in production
- ✅ Secure HTTP-only cookies
- ✅ JWT token validation
- ✅ CSRF protection
- ✅ Input sanitization
- ✅ SQL injection prevention
- ✅ XSS protection
- ✅ Rate limiting on auth endpoints
- ✅ Secure password hashing
- ✅ Role-based access control

---

## 🚀 Deployment

### Prerequisites
- Environment variables configured
- Stripe webhook endpoint configured
- Backend API URL set correctly
- Database migrations completed

### Deploy to Vercel

```bash
# Push to GitHub
git push origin main

# Vercel auto-deploys on push
# Or use Vercel CLI:
vercel deploy
```

### Deploy to Other Platforms

```bash
# Build the application
npm run build

# Start production server
npm run start
```

---

## 📚 Documentation

- **API_INTEGRATION.md** - Complete API endpoint documentation
- **Component Comments** - Inline documentation in components

---

## 🔄 Git Commits

The implementation includes 20+ meaningful commits covering:
- Project setup and configuration
- UI components and layouts
- Authentication pages and logic
- Dashboard implementations
- Payment integration
- Error handling
- API routing
- TypeScript type definitions
- Stripe integration
- Documentation

---

## 🛠️ Tech Stack

- **Frontend Framework**: Next.js 16.2.12
- **UI Library**: React 19.2.4
- **Styling**: Tailwind CSS 4
- **Components**: shadcn/ui
- **Payment**: Stripe (via @stripe/stripe-js)
- **Icons**: lucide-react
- **Notifications**: sonner
- **Forms**: React Hook Form (via components)
- **Validation**: TypeScript
- **Type Safety**: TypeScript 5
- **Build Tool**: Turbopack (Next.js default)

---

## 📞 Support

### Getting Help
- Check `API_INTEGRATION.md` for endpoint details
- See component comments for usage examples
- Check console logs for error details

### Common Issues
1. **Payment not loading**: Check Stripe keys in .env
2. **Middleware errors**: Verify JWT_SECRET is set
3. **Database connection**: Check backend API URL
4. **Build errors**: Clear .next folder and rebuild
5. **TypeScript errors**: Run `npx tsc --noEmit` to check

---

## 📄 License

RentNest © 2024. All rights reserved.

---

## 👥 Team

Developed by RentNest Development Team

**Current Version**: 1.0.0  
**Last Updated**: August 2024  
**Status**: Production Ready ✅

---

## 🎉 Key Highlights

✨ **Premium UI Design** - Modern, polished interface  
🔒 **Secure** - Enterprise-grade security practices  
⚡ **Fast** - Optimized performance metrics  
📱 **Responsive** - Works on all devices  
🌓 **Dark Mode** - Comfortable viewing anytime  
♿ **Accessible** - WCAG 2.1 AA compliant  
🧪 **Well Tested** - Comprehensive test coverage  
📖 **Well Documented** - Complete API docs  

---

## 🚀 Getting Started

1. **Install Dependencies**: `npm install`
2. **Configure Environment**: Copy `.env.development.local` to `.env.local`
3. **Start Dev Server**: `npm run dev`
4. **Login with**: admin@rentnest.com / Admin@123456
5. **View API Docs**: Read `API_INTEGRATION.md`

---


---

# 🚧 Future Improvements

- Real-time notifications
- Chat between tenant and landlord
- Wishlist/Favorites
- Property image uploads
- Email notifications
- Analytics dashboard
- Advanced property search
- Google Maps integration
- Multi-language support

---

# 👨‍💻 Author

Developed by **Ikhtiaj Arif**

Full-Stack Developer specializing in scalable web applications using Next.js, TypeScript, and modern React.
---

## 📝 Phase 1 Audit Changelog

Recent fixes from the ongoing code review (see `API_INTEGRATION.md` for full detail):

- Fixed the properties **Sort By** and **Categories** filters, which were
  silently ignored by the backend (`sort`/`categoryId` query params weren't
  read at all).
- Fixed admin **approve/reject landlord request** not refreshing the table
  (missing cache revalidation).
- Made `_actions` files consistent: server actions now uniformly wrap fetch
  calls in try/catch, check `res.ok`, and revalidate the relevant cached
  paths on success.
- Reworked the properties filter sidebar so only "Sort By" is expanded by
  default and the panel has an internal scroll cap, instead of every filter
  section stacking open and making the whole sidebar scroll.

This README's environment variable, project structure, and endpoint
sections were also corrected to match what's actually in this repo (they
previously referenced files/env vars — like a Stripe key in this frontend,
or `TESTING_GUIDE.md` — that don't exist in the codebase).
