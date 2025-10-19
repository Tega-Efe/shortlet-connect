import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, user, updateProfile, User } from '@angular/fire/auth';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc, setDoc, getDoc, query, where, getDocs } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);
  private router: Router = inject(Router);
  
  // Get current user as observable
  user$ = user(this.auth);
  currentUser: User | null = null;

  constructor() {
    this.user$.subscribe(user => {
      this.currentUser = user;
    });
  }

  // Authentication Methods
  async signUp(email: string, password: string, displayName: string) {
    try {
      const credential = await createUserWithEmailAndPassword(this.auth, email, password);
      
      // Update profile with display name
      if (credential.user) {
        await updateProfile(credential.user, { displayName });
        
        // Create user document in Firestore
        await setDoc(doc(this.firestore, 'users', credential.user.uid), {
          uid: credential.user.uid,
          email: email,
          displayName: displayName,
          createdAt: new Date(),
          role: 'user'
        });
      }
      
      return credential;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  }

  async signIn(email: string, password: string) {
    try {
      const credential = await signInWithEmailAndPassword(this.auth, email, password);
      return credential;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  }

  async signOut() {
    try {
      await signOut(this.auth);
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  }

  async getUserProfile(uid: string) {
    try {
      const userDoc = await getDoc(doc(this.firestore, 'users', uid));
      return userDoc.exists() ? userDoc.data() : null;
    } catch (error) {
      console.error('Error getting user profile:', error);
      throw error;
    }
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }
}
