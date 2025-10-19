import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApartmentService } from '../../services/apartment.service';
import { Apartment } from '../../models/models';

@Component({
  selector: 'app-add-sample-data',
  imports: [CommonModule],
  template: `
    <div class="sample-data-container">
      <div class="card">
        <h1>🏠 Add Sample Apartments</h1>
        <p>Click the button below to add sample apartment data to your Firestore database</p>
        
        @if (loading) {
          <div class="loading">
            <div class="spinner"></div>
            <p>Adding sample data...</p>
          </div>
        } @else if (message) {
          <div [class]="messageClass">
            {{ message }}
          </div>
          @if (success) {
            <button class="btn-primary" (click)="goToApartments()">
              View Apartments
            </button>
          }
        } @else {
          <button class="btn-primary" (click)="addSampleData()">
            Add Sample Apartments
          </button>
        }
      </div>
    </div>
  `,
  styles: [`
    .sample-data-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .card {
      background: white;
      border-radius: 20px;
      padding: 3rem;
      max-width: 600px;
      width: 100%;
      text-align: center;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }

    h1 {
      font-size: 2rem;
      color: #1a202c;
      margin-bottom: 1rem;
    }

    p {
      color: #718096;
      margin-bottom: 2rem;
    }

    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 1rem 2rem;
      border: none;
      border-radius: 10px;
      font-size: 1.1rem;
      font-weight: 700;
      cursor: pointer;
      transition: transform 0.2s ease;
    }

    .btn-primary:hover {
      transform: translateY(-2px);
    }

    .loading {
      padding: 2rem 0;
    }

    .spinner {
      width: 50px;
      height: 50px;
      margin: 0 auto 1rem;
      border: 4px solid #e2e8f0;
      border-top-color: #667eea;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .success-message {
      background: #c6f6d5;
      color: #2f855a;
      padding: 1rem;
      border-radius: 10px;
      margin-bottom: 1rem;
    }

    .error-message {
      background: #fed7d7;
      color: #c53030;
      padding: 1rem;
      border-radius: 10px;
      margin-bottom: 1rem;
    }
  `]
})
export class AddSampleDataComponent implements OnInit {
  private apartmentService = inject(ApartmentService);
  private router = inject(Router);

  loading = false;
  message = '';
  messageClass = '';
  success = false;

  ngOnInit() {
    // Check if apartments already exist
    this.apartmentService.getApartments().subscribe({
      next: (apartments) => {
        if (apartments.length > 0) {
          this.message = `You already have ${apartments.length} apartments in your database!`;
          this.messageClass = 'success-message';
          this.success = true;
        }
      }
    });
  }

  async addSampleData() {
    this.loading = true;
    this.message = '';

    const sampleApartments: Partial<Apartment>[] = [
      {
        hostId: 'sample-host-1',
        hostName: 'Sarah Johnson',
        title: 'Luxury Downtown Loft',
        description: 'Beautiful modern loft in the heart of the city with stunning skyline views. Perfect for professionals and couples.',
        address: '123 Main Street',
        city: 'New York',
        country: 'USA',
        price: 180,
        currency: '$',
        bedrooms: 2,
        bathrooms: 2,
        maxGuests: 4,
        amenities: ['WiFi', 'Air Conditioning', 'Kitchen', 'Workspace', 'Parking', 'Gym Access'],
        images: [],
        mainImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
        available: true,
        rating: 4.8,
        reviewCount: 24,
        createdAt: new Date()
      },
      {
        hostId: 'sample-host-2',
        hostName: 'Michael Chen',
        title: 'Cozy Beach House',
        description: 'Charming beach house with direct ocean access. Wake up to the sound of waves and enjoy stunning sunsets.',
        address: '456 Ocean Drive',
        city: 'Miami',
        country: 'USA',
        price: 220,
        currency: '$',
        bedrooms: 3,
        bathrooms: 2,
        maxGuests: 6,
        amenities: ['WiFi', 'Beach Access', 'Kitchen', 'BBQ Grill', 'Outdoor Shower', 'Beach Chairs'],
        images: [],
        mainImage: 'https://images.unsplash.com/photo-1499916078039-922301b0eb9b?w=800',
        available: true,
        rating: 4.9,
        reviewCount: 38,
        createdAt: new Date()
      },
      {
        hostId: 'sample-host-3',
        hostName: 'Emma Wilson',
        title: 'Mountain Cabin Retreat',
        description: 'Peaceful cabin surrounded by nature. Perfect for a quiet getaway with hiking trails nearby.',
        address: '789 Mountain Road',
        city: 'Aspen',
        country: 'USA',
        price: 150,
        currency: '$',
        bedrooms: 2,
        bathrooms: 1,
        maxGuests: 4,
        amenities: ['WiFi', 'Fireplace', 'Kitchen', 'Hiking Trails', 'Mountain Views', 'Hot Tub'],
        images: [],
        mainImage: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800',
        available: true,
        rating: 4.7,
        reviewCount: 15,
        createdAt: new Date()
      },
      {
        hostId: 'sample-host-4',
        hostName: 'David Martinez',
        title: 'Modern City Apartment',
        description: 'Stylish apartment in a vibrant neighborhood with restaurants and shops within walking distance.',
        address: '321 Urban Ave',
        city: 'San Francisco',
        country: 'USA',
        price: 160,
        currency: '$',
        bedrooms: 1,
        bathrooms: 1,
        maxGuests: 2,
        amenities: ['WiFi', 'Air Conditioning', 'Kitchen', 'Balcony', 'Elevator', 'Smart TV'],
        images: [],
        mainImage: 'https://images.unsplash.com/photo-1502672260066-6bc35f0af07e?w=800',
        available: true,
        rating: 4.6,
        reviewCount: 12,
        createdAt: new Date()
      },
      {
        hostId: 'sample-host-5',
        hostName: 'Lisa Anderson',
        title: 'Family Friendly Townhouse',
        description: 'Spacious townhouse perfect for families. Close to parks, schools, and shopping centers.',
        address: '654 Family Lane',
        city: 'Austin',
        country: 'USA',
        price: 200,
        currency: '$',
        bedrooms: 4,
        bathrooms: 3,
        maxGuests: 8,
        amenities: ['WiFi', 'Air Conditioning', 'Kitchen', 'Washer/Dryer', 'Backyard', 'Kids Friendly'],
        images: [],
        mainImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
        available: true,
        rating: 4.9,
        reviewCount: 31,
        createdAt: new Date()
      }
    ];

    try {
      for (const apt of sampleApartments) {
        await this.apartmentService.addApartment(apt as Apartment);
      }
      this.message = `Successfully added ${sampleApartments.length} sample apartments!`;
      this.messageClass = 'success-message';
      this.success = true;
    } catch (error) {
      console.error('Error adding sample data:', error);
      this.message = 'Failed to add sample data. Please try again.';
      this.messageClass = 'error-message';
      this.success = false;
    } finally {
      this.loading = false;
    }
  }

  goToApartments() {
    this.router.navigate(['/apartments']);
  }
}
