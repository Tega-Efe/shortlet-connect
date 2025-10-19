import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ApartmentService } from '../../services/apartment.service';
import { Apartment } from '../../models/models';

@Component({
  selector: 'app-apartments',
  imports: [CommonModule],
  templateUrl: './apartments.component.html',
  styleUrl: './apartments.component.css'
})
export class ApartmentsComponent implements OnInit {
  private apartmentService = inject(ApartmentService);
  private router = inject(Router);

  apartments: Apartment[] = [];
  isLoading = true;

  ngOnInit() {
    this.loadApartments();
  }

  loadApartments() {
    this.apartmentService.getApartments().subscribe({
      next: (apartments) => {
        this.apartments = apartments;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading apartments:', error);
        this.isLoading = false;
      }
    });
  }

  viewApartment(apartmentId: string | undefined) {
    if (apartmentId) {
      this.router.navigate(['/apartments', apartmentId]);
    }
  }
}
