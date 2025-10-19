import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc, setDoc, getDoc, query, where, getDocs, orderBy, Timestamp } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apartment, Booking } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ApartmentService {
  private firestore: Firestore = inject(Firestore);

  // Get all available apartments
  getApartments(): Observable<Apartment[]> {
    const apartmentsRef = collection(this.firestore, 'apartments');
    const q = query(apartmentsRef, where('available', '==', true), orderBy('createdAt', 'desc'));
    
    return collectionData(q, { idField: 'id' }).pipe(
      map((apartments: any[]) => apartments.map(apt => ({
        ...apt,
        createdAt: apt.createdAt?.toDate ? apt.createdAt.toDate() : new Date(apt.createdAt)
      })))
    );
  }

  // Get apartment by ID
  async getApartmentById(id: string): Promise<Apartment | null> {
    try {
      const apartmentDoc = await getDoc(doc(this.firestore, 'apartments', id));
      if (apartmentDoc.exists()) {
        const data = apartmentDoc.data() as any;
        return {
          ...data,
          id: apartmentDoc.id,
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(data.createdAt)
        };
      }
      return null;
    } catch (error) {
      console.error('Error getting apartment:', error);
      throw error;
    }
  }

  // Add new apartment (for hosts)
  async addApartment(apartment: Apartment): Promise<string> {
    try {
      const apartmentsRef = collection(this.firestore, 'apartments');
      const docRef = await addDoc(apartmentsRef, {
        ...apartment,
        createdAt: Timestamp.now()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding apartment:', error);
      throw error;
    }
  }

  // Update apartment
  async updateApartment(id: string, apartment: Partial<Apartment>): Promise<void> {
    try {
      const apartmentRef = doc(this.firestore, 'apartments', id);
      await updateDoc(apartmentRef, apartment);
    } catch (error) {
      console.error('Error updating apartment:', error);
      throw error;
    }
  }

  // Delete apartment
  async deleteApartment(id: string): Promise<void> {
    try {
      await deleteDoc(doc(this.firestore, 'apartments', id));
    } catch (error) {
      console.error('Error deleting apartment:', error);
      throw error;
    }
  }

  // Search apartments by city
  searchApartmentsByCity(city: string): Observable<Apartment[]> {
    const apartmentsRef = collection(this.firestore, 'apartments');
    const q = query(
      apartmentsRef, 
      where('city', '==', city),
      where('available', '==', true)
    );
    
    return collectionData(q, { idField: 'id' }).pipe(
      map((apartments: any[]) => apartments.map(apt => ({
        ...apt,
        createdAt: apt.createdAt?.toDate ? apt.createdAt.toDate() : new Date(apt.createdAt)
      })))
    );
  }
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private firestore: Firestore = inject(Firestore);

  // Create a booking
  async createBooking(booking: Booking): Promise<string> {
    try {
      const bookingsRef = collection(this.firestore, 'bookings');
      const docRef = await addDoc(bookingsRef, {
        ...booking,
        checkIn: Timestamp.fromDate(new Date(booking.checkIn)),
        checkOut: Timestamp.fromDate(new Date(booking.checkOut)),
        createdAt: Timestamp.now(),
        status: 'pending'
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  }

  // Get user's bookings
  getUserBookings(userId: string): Observable<Booking[]> {
    const bookingsRef = collection(this.firestore, 'bookings');
    const q = query(bookingsRef, where('userId', '==', userId), orderBy('createdAt', 'desc'));
    
    return collectionData(q, { idField: 'id' }).pipe(
      map((bookings: any[]) => bookings.map(booking => ({
        ...booking,
        checkIn: booking.checkIn?.toDate ? booking.checkIn.toDate() : new Date(booking.checkIn),
        checkOut: booking.checkOut?.toDate ? booking.checkOut.toDate() : new Date(booking.checkOut),
        createdAt: booking.createdAt?.toDate ? booking.createdAt.toDate() : new Date(booking.createdAt)
      })))
    );
  }

  // Get apartment's bookings
  getApartmentBookings(apartmentId: string): Observable<Booking[]> {
    const bookingsRef = collection(this.firestore, 'bookings');
    const q = query(bookingsRef, where('apartmentId', '==', apartmentId), orderBy('checkIn', 'asc'));
    
    return collectionData(q, { idField: 'id' }).pipe(
      map((bookings: any[]) => bookings.map(booking => ({
        ...booking,
        checkIn: booking.checkIn?.toDate ? booking.checkIn.toDate() : new Date(booking.checkIn),
        checkOut: booking.checkOut?.toDate ? booking.checkOut.toDate() : new Date(booking.checkOut),
        createdAt: booking.createdAt?.toDate ? booking.createdAt.toDate() : new Date(booking.createdAt)
      })))
    );
  }

  // Update booking status
  async updateBookingStatus(bookingId: string, status: Booking['status']): Promise<void> {
    try {
      const bookingRef = doc(this.firestore, 'bookings', bookingId);
      await updateDoc(bookingRef, { status });
    } catch (error) {
      console.error('Error updating booking status:', error);
      throw error;
    }
  }

  // Cancel booking
  async cancelBooking(bookingId: string): Promise<void> {
    try {
      await this.updateBookingStatus(bookingId, 'cancelled');
    } catch (error) {
      console.error('Error cancelling booking:', error);
      throw error;
    }
  }
}
