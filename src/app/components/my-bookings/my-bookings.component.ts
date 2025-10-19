import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BookingService } from '../../services/apartment.service';
import { AuthService } from '../../services/firebase.service';
import { Booking } from '../../models/models';

@Component({
  selector: 'app-my-bookings',
  imports: [CommonModule, RouterLink],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.css'
})
export class MyBookingsComponent implements OnInit {
  private bookingService = inject(BookingService);
  private authService = inject(AuthService);

  bookings: Booking[] = [];
  isLoading = true;

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
    const user = this.authService.currentUser;
    if (user) {
      this.bookingService.getUserBookings(user.uid).subscribe({
        next: (bookings) => {
          this.bookings = bookings;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading bookings:', error);
          this.isLoading = false;
        }
      });
    }
  }

  async cancelBooking(bookingId: string | undefined) {
    if (!bookingId || !confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    try {
      await this.bookingService.cancelBooking(bookingId);
    } catch (error) {
      console.error('Error cancelling booking:', error);
      alert('Failed to cancel booking');
    }
  }

  getStatusClass(status: string): string {
    const classes: Record<string, string> = {
      'pending': 'status-pending',
      'confirmed': 'status-confirmed',
      'cancelled': 'status-cancelled',
      'completed': 'status-completed'
    };
    return classes[status] || '';
  }
}
