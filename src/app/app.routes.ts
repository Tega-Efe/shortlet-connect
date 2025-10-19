import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'apartments',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'apartments',
    loadComponent: () => import('./components/apartments/apartments.component').then(m => m.ApartmentsComponent)
  },
  {
    path: 'apartments/:id',
    loadComponent: () => import('./components/apartment-detail/apartment-detail.component').then(m => m.ApartmentDetailComponent)
  },
  {
    path: 'book/:id',
    loadComponent: () => import('./components/booking/booking.component').then(m => m.BookingComponent),
    canActivate: [authGuard]
  },
  {
    path: 'my-bookings',
    loadComponent: () => import('./components/my-bookings/my-bookings.component').then(m => m.MyBookingsComponent),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: 'apartments'
  }
];
