# Shortlet - Apartment Booking Platform

A modern, responsive apartment booking platform built with Angular 19 and Firebase.

## 🚀 Live Demo
**Production URL:** https://shortlet-connect.web.app

## 📋 Features Implemented

### Authentication System
- ✅ User Registration with email and password
- ✅ User Login with session management
- ✅ Protected routes with Auth Guards
- ✅ User profile management
- ✅ Sign out functionality

### Apartment Management
- ✅ Browse available apartments
- ✅ View apartment details (images, amenities, pricing)
- ✅ Search and filter apartments
- ✅ Responsive apartment cards with modern UI

### Booking System
- ✅ Book apartments with date selection
- ✅ Guest count selection
- ✅ Special requests field
- ✅ Price calculation based on nights
- ✅ View booking history
- ✅ Cancel bookings
- ✅ Booking status tracking (pending, confirmed, cancelled, completed)

### Firebase Integration
- ✅ Firebase Authentication for user management
- ✅ Firestore Database for data storage
- ✅ Firebase Analytics for usage tracking
- ✅ Firebase Performance Monitoring
- ✅ Firebase Hosting for deployment

## 🎨 Design Features

### Modern UI/UX
- Gradient-based color scheme (Purple/Blue theme)
- Responsive design (Mobile, Tablet, Desktop)
- Smooth animations and transitions
- Card-based layout
- Clean typography
- Intuitive navigation

### Components Created
1. **Navbar** - Responsive navigation with user menu
2. **Login** - Beautiful login form with error handling
3. **Register** - User registration with validation
4. **Apartments List** - Grid view of available apartments
5. **Apartment Detail** - Detailed view with booking CTA
6. **Booking Form** - Complete booking interface
7. **My Bookings** - User's booking history

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── apartment-detail/
│   │   ├── apartments/
│   │   ├── booking/
│   │   ├── login/
│   │   ├── my-bookings/
│   │   ├── navbar/
│   │   └── register/
│   ├── guards/
│   │   └── auth.guard.ts
│   ├── models/
│   │   └── models.ts
│   ├── services/
│   │   ├── firebase.service.ts (AuthService)
│   │   └── apartment.service.ts (ApartmentService & BookingService)
│   ├── app.config.ts
│   └── app.routes.ts
├── environments/
│   ├── environment.ts
│   └── environment.prod.ts
└── styles.css
```

## 🔥 Firebase Collections

### users
```typescript
{
  uid: string;
  email: string;
  displayName: string;
  role: 'user' | 'host' | 'admin';
  createdAt: Date;
}
```

### apartments
```typescript
{
  hostId: string;
  title: string;
  description: string;
  address: string;
  city: string;
  country: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  amenities: string[];
  images: string[];
  available: boolean;
  rating?: number;
  createdAt: Date;
}
```

### bookings
```typescript
{
  apartmentId: string;
  userId: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: Date;
}
```

## 🚦 Routes

| Path | Component | Protected | Description |
|------|-----------|-----------|-------------|
| `/` | Apartments | No | Redirects to apartments list |
| `/login` | Login | No | User login |
| `/register` | Register | No | User registration |
| `/apartments` | Apartments | No | Browse apartments |
| `/apartments/:id` | Apartment Detail | No | View apartment details |
| `/book/:id` | Booking | Yes | Book apartment |
| `/my-bookings` | My Bookings | Yes | View user bookings |

## 💻 Development Commands

```bash
# Install dependencies
npm install

# Start development server
ng serve

# Build for production
ng build

# Deploy to Firebase
firebase deploy --only hosting

# Run tests
ng test
```

## 🎯 Future Enhancements

- [ ] Add image upload for apartments
- [ ] Implement host dashboard
- [ ] Add review and rating system
- [ ] Payment integration
- [ ] Advanced search filters
- [ ] Map integration
- [ ] Email notifications
- [ ] Social authentication (Google, Facebook)
- [ ] Admin panel
- [ ] Multi-currency support

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔐 Security Features

- Protected routes with Auth Guards
- Firebase Authentication
- Firestore Security Rules (to be configured)
- Input validation
- Error handling

## 🎨 Color Palette

- Primary: `#667eea` (Purple-Blue)
- Secondary: `#764ba2` (Purple)
- Success: `#48bb78` (Green)
- Error: `#f56565` (Red)
- Warning: `#f59e0b` (Orange)
- Background: `#f7fafc` (Light Gray)
- Text: `#2d3748` (Dark Gray)

## 📞 Support

For issues or questions, please create an issue on GitHub.

## 📄 License

MIT License

---

Built with ❤️ using Angular and Firebase
