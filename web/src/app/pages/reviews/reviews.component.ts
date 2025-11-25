import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CarDatabaseService } from '../../car-database.service';
import { ApiService, Review, Mechanic } from '../../api.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss',
})
export class ReviewsComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly carDb = inject(CarDatabaseService);
  private readonly api = inject(ApiService);

  filterForm = this.fb.group({
    rating: ['all'],
    service: ['all'],
    vehicleMake: ['all'],
    zipCode: [''],
  });

  sortBy = 'relevance';
  displayedReviews: Review[] = [];
  allReviews: Review[] = [];
  mechanics: Map<string, Mechanic> = new Map();
  totalReviews = 0;
  averageRating = 0;
  showingCount = 10;
  isLoading = false;
  readonly Math = Math;

  readonly makes: string[] = [];
  readonly services = [
    'All Services',
    'Oil Change',
    'Brake Pads Replacement',
    'Battery Replacement',
    'Pre-purchase Car Inspection',
    'Car is not starting Diagnostic',
    'Check Engine Light Diagnostic',
    'Towing and Roadside',
  ];

  ngOnInit(): void {
    this.loadMakes();
    this.loadReviews();
    this.loadReviewStats();
  }

  async loadMakes(): Promise<void> {
    const currentYear = new Date().getFullYear();
    try {
      const makes = await this.carDb.getMakes(currentYear);
      this.makes.push(...makes);
    } catch (error) {
      console.error('Error loading makes:', error);
    }
  }

  loadReviews(): void {
    this.isLoading = true;
    this.api
      .getReviews({
        limit: 1000, // Load all reviews for filtering
        sortBy: this.sortBy as 'newest' | 'oldest' | 'highest' | 'lowest' | 'relevance',
      })
      .pipe(
        catchError((error) => {
          console.error('Error loading reviews:', error);
          return of([]);
        }),
      )
      .subscribe({
        next: (reviews) => {
          this.allReviews = reviews;
          this.loadMechanicsForReviews(reviews);
          this.applyFilters();
          this.isLoading = false;
        },
      });
  }

  loadReviewStats(): void {
    this.api
      .getReviewStats()
      .pipe(
        catchError((error) => {
          console.error('Error loading review stats:', error);
          return of({ totalReviews: 0, averageRating: 0 });
        }),
      )
      .subscribe({
        next: (stats) => {
          this.totalReviews = stats.totalReviews;
          this.averageRating = stats.averageRating;
        },
      });
  }

  loadMechanicsForReviews(reviews: Review[]): void {
    const mechanicIds = [...new Set(reviews.map((r) => r.mechanicId))];
    mechanicIds.forEach((id) => {
      this.api
        .getMechanic(id)
        .pipe(
          catchError((error) => {
            console.error(`Error loading mechanic ${id}:`, error);
            return of(null);
          }),
        )
        .subscribe({
          next: (mechanic) => {
            if (mechanic) {
              this.mechanics.set(id, mechanic);
            }
          },
        });
    });
  }

  updateFilters(): void {
    const { rating, service, vehicleMake, zipCode } = this.filterForm.value;
    // Filter logic would go here
    // For now, just update displayed reviews
    this.applyFilters();
  }

  clearFilters(): void {
    this.filterForm.patchValue({
      rating: 'all',
      service: 'all',
      vehicleMake: 'all',
      zipCode: '',
    });
    this.applyFilters();
  }

  applyFilters(): void {
    const { rating, service, vehicleMake } = this.filterForm.value;
    let filtered = [...this.allReviews];

    if (rating && rating !== 'all') {
      filtered = filtered.filter((r) => r.rating === parseInt(rating));
    }

    if (service && service !== 'all') {
      filtered = filtered.filter((r) => r.serviceDescription.includes(service));
    }

    if (vehicleMake && vehicleMake !== 'all') {
      filtered = filtered.filter((r) => r.carModel.toLowerCase().includes(vehicleMake.toLowerCase()));
    }

    this.applySorting(filtered);
  }

  loadMore(): void {
    this.showingCount += 10;
    this.applyFilters();
  }

  onSortChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.sortBy = target.value;
    this.applyFilters();
  }

  applySorting(reviews: Review[]): void {
    let sorted = [...reviews];
    switch (this.sortBy) {
      case 'newest':
        sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'highest':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'lowest':
        sorted.sort((a, b) => a.rating - b.rating);
        break;
      default:
        // relevance - keep original order
        break;
    }
    this.displayedReviews = sorted.slice(0, this.showingCount);
  }

  getStars(rating: number): boolean[] {
    return Array.from({ length: 5 }, (_, i) => i < rating);
  }

  generateSlug(name: string): string {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  getMechanicRoute(mechanicId: string, mechanicName: string): string[] {
    const mechanic = this.mechanics.get(mechanicId);
    if (mechanic) {
      return ['/mechanic', mechanic.id, mechanic.slug];
    }
    const slug = this.generateSlug(mechanicName);
    return ['/mechanic', mechanicId, slug];
  }

  getMechanicName(mechanicId: string): string {
    const mechanic = this.mechanics.get(mechanicId);
    return mechanic?.name ?? 'Unknown Mechanic';
  }

  formatDate(dateString: string | null | undefined): { date: string; time: string } {
    if (!dateString) {
      return { date: 'Date unavailable', time: '' };
    }
    
    // Prisma/PostgreSQL returns ISO 8601 format dates
    // Handle various formats: ISO strings, PostgreSQL timestamps, etc.
    let date: Date;
    
    try {
      // First, try parsing as-is (handles ISO 8601)
      date = new Date(dateString);
      
      // If invalid, try to clean up the string
      if (isNaN(date.getTime())) {
        // Handle PostgreSQL timestamp format: '2024-01-15 14:30:00'
        // Convert to ISO format by replacing space with 'T' and adding 'Z' if no timezone
        let cleaned = dateString.trim();
        if (cleaned.includes(' ') && !cleaned.includes('T')) {
          cleaned = cleaned.replace(' ', 'T');
        }
        // Add 'Z' if no timezone indicator
        if (!cleaned.includes('Z') && !cleaned.includes('+') && !cleaned.match(/[+-]\d{2}:\d{2}$/)) {
          cleaned = cleaned + 'Z';
        }
        date = new Date(cleaned);
      }
      
      // Final validity check
      if (isNaN(date.getTime())) {
        console.warn('Invalid date string:', dateString);
        return { date: 'Date unavailable', time: '' };
      }
    } catch (error) {
      console.error('Error parsing date:', dateString, error);
      return { date: 'Date unavailable', time: '' };
    }
    
    try {
      const dateStr = date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      const timeStr = date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true
      });
      return { date: dateStr, time: timeStr };
    } catch (error) {
      console.error('Error formatting date:', error);
      return { date: 'Date unavailable', time: '' };
    }
  }
}

