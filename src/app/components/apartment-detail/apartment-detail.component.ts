import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApartmentService } from '../../services/apartment.service';
import { AuthService } from '../../services/firebase.service';
import { Apartment } from '../../models/models';

@Component({
  selector: 'app-apartment-detail',
  imports: [CommonModule],
  templateUrl: './apartment-detail.component.html',
  styleUrl: './apartment-detail.component.css'
})
export class ApartmentDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private apartmentService = inject(ApartmentService);
  private authService = inject(AuthService);

  apartment: Apartment | null = null;
  isLoading = true;
  isLoggedIn = false;

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.isLoggedIn = !!user;
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadApartment(id);
    }
  }

  async loadApartment(id: string) {
    try {
      this.apartment = await this.apartmentService.getApartmentById(id);
      this.isLoading = false;
    } catch (error) {
      console.error('Error loading apartment:', error);
      this.isLoading = false;
    }
  }

  bookNow() {
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }
    if (this.apartment?.id) {
      this.router.navigate(['/book', this.apartment.id]);
    }
  }

  goBack() {
    this.router.navigate(['/apartments']);
  }
}
