import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApartmentService, BookingService } from '../../services/apartment.service';
import { AuthService } from '../../services/firebase.service';
import { Apartment, Booking } from '../../models/models';

@Component({
  selector: 'app-booking',
  imports: [CommonModule, FormsModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private apartmentService = inject(ApartmentService);
  private bookingService = inject(BookingService);
  private authService = inject(AuthService);

  apartment: Apartment | null = null;
  checkIn = '';
  checkOut = '';
  guests = 1;
  specialRequests = '';
  totalPrice = 0;
  nights = 0;
  errorMessage = '';
  successMessage = '';
  isLoading = false;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadApartment(id);
    }

    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    this.checkIn = today;
  }

  async loadApartment(id: string) {
    try {
      this.apartment = await this.apartmentService.getApartmentById(id);
    } catch (error) {
      console.error('Error loading apartment:', error);
      this.errorMessage = 'Failed to load apartment details';
    }
  }

  calculateTotal() {
    if (this.checkIn && this.checkOut && this.apartment) {
      const start = new Date(this.checkIn);
      const end = new Date(this.checkOut);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      this.nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      this.totalPrice = this.nights * this.apartment.price;
    }
  }

  async onSubmit() {
    if (!this.apartment || !this.checkIn || !this.checkOut) {
      this.errorMessage = 'Please fill in all required fields';
      return;
    }

    if (this.guests > this.apartment.maxGuests) {
      this.errorMessage = `Maximum ${this.apartment.maxGuests} guests allowed`;
      return;
    }

    if (new Date(this.checkIn) >= new Date(this.checkOut)) {
      this.errorMessage = 'Check-out date must be after check-in date';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    try {
      const user = this.authService.currentUser;
      if (!user) {
        this.router.navigate(['/login']);
        return;
      }

      const booking: Booking = {
        apartmentId: this.apartment.id!,
        apartmentTitle: this.apartment.title,
        userId: user.uid,
        userName: user.displayName || user.email || '',
        userEmail: user.email || '',
        checkIn: new Date(this.checkIn),
        checkOut: new Date(this.checkOut),
        guests: this.guests,
        totalPrice: this.totalPrice,
        status: 'pending',
        createdAt: new Date(),
        specialRequests: this.specialRequests
      };

      await this.bookingService.createBooking(booking);
      this.successMessage = 'Booking request submitted successfully!';
      
      setTimeout(() => {
        this.router.navigate(['/my-bookings']);
      }, 2000);
    } catch (error) {
      console.error('Error creating booking:', error);
      this.errorMessage = 'Failed to create booking. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }

  goBack() {
    if (this.apartment?.id) {
      this.router.navigate(['/apartments', this.apartment.id]);
    } else {
      this.router.navigate(['/apartments']);
    }
  }
}
