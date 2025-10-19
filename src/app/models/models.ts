export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: 'user' | 'host' | 'admin';
  createdAt: Date;
  phone?: string;
}

export interface Apartment {
  id?: string;
  hostId: string;
  hostName: string;
  title: string;
  description: string;
  address: string;
  city: string;
  country: string;
  price: number;
  currency: string;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  amenities: string[];
  images: string[];
  mainImage: string;
  available: boolean;
  rating?: number;
  reviewCount?: number;
  createdAt: Date;
}

export interface Booking {
  id?: string;
  apartmentId: string;
  apartmentTitle: string;
  userId: string;
  userName: string;
  userEmail: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: Date;
  specialRequests?: string;
}

export interface Review {
  id?: string;
  apartmentId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}
