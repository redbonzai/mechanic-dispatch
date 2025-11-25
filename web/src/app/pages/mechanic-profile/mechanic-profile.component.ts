import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CarDatabaseService } from '../../car-database.service';

interface Mechanic {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  jobsCompleted: number;
  yearsExperience: number;
  sinceYear: number;
  description: string;
  certifications: string[];
  badges: string[];
  location: string;
}

interface Review {
  id: string;
  reviewerName: string;
  rating: number;
  date: string;
  service: string;
  vehicle: string;
  location: string;
  reviewText: string;
  helpfulCount: number;
  mechanicResponse?: string;
}

interface RelatedMechanic {
  id: string;
  name: string;
  image: string;
  location: string;
}

@Component({
  selector: 'app-mechanic-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './mechanic-profile.component.html',
  styleUrl: './mechanic-profile.component.scss',
})
export class MechanicProfileComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly carDb = inject(CarDatabaseService);

  quoteForm = this.fb.group({
    service: [''],
    vehicle: [''],
    zipCode: [''],
  });

  mechanic: Mechanic | null = null;
  reviews: Review[] = [];
  relatedMechanics: RelatedMechanic[] = [];

  years: number[] = [];
  makes: string[] = [];
  models: string[] = [];
  loadingMakes = false;
  loadingModels = false;

  readonly services = [
    'Oil Change',
    'Brake Pads Replacement',
    'Battery Replacement',
    'Pre-purchase Car Inspection',
    'Car is not starting Diagnostic',
    'Check Engine Light Diagnostic',
    'Tire Replacement',
    'AC Repair',
  ];

  ngOnInit(): void {
    this.loadYears();
    const mechanicId = this.route.snapshot.paramMap.get('id');
    const slug = this.route.snapshot.paramMap.get('slug');
    
    if (mechanicId) {
      this.loadMechanic(mechanicId);
      this.loadReviews(mechanicId);
      
      // Redirect to include slug if not present
      if (!slug && this.mechanic) {
        const expectedSlug = this.generateSlug(this.mechanic.name);
        this.router.navigate(['/mechanic', mechanicId, expectedSlug], { replaceUrl: true });
      }
    }
    
    this.loadRelatedMechanics();
  }

  generateSlug(name: string): string {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  async loadYears(): Promise<void> {
    const currentYear = new Date().getFullYear();
    this.years = Array.from({ length: currentYear - 1990 + 1 }, (_, i) => currentYear - i);
  }

  loadMechanic(id: string): void {
    // In a real app, this would fetch from an API
    const mechanics: Record<string, Mechanic> = {
      '1': {
        id: '1',
        name: 'Rocco',
        image: '',
        rating: 5,
        reviewCount: 1000,
        jobsCompleted: 1000,
        yearsExperience: 20,
        sinceYear: 2014,
        description:
          'Rocco has been a mechanic for over 20 years. He is an ASE certified Master Technician and has worked on all makes and models of cars. He is passionate about cars and loves to help people. Rocco is a true professional and will always go the extra mile to make sure his customers are happy. He is honest, reliable, and always on time. Rocco is a great choice for all your car repair needs.',
        certifications: ['ASE Master Technician'],
        badges: ['Top Rated'],
        location: 'Los Angeles, CA',
      },
      '2': {
        id: '2',
        name: 'Robert',
        image: '',
        rating: 5,
        reviewCount: 675,
        jobsCompleted: 800,
        yearsExperience: 35,
        sinceYear: 2012,
        description:
          'Robert is a master technician with over 35 years of experience. He specializes in complex diagnostics and engine repair. Known for his attention to detail and customer service, Robert has built a reputation as one of the most trusted mechanics in the area.',
        certifications: ['ASE Master Technician'],
        badges: ['Top Rated', 'Expert'],
        location: 'Los Angeles, CA',
      },
    };

    this.mechanic = mechanics[id] || mechanics['1'];
  }

  loadReviews(mechanicId: string): void {
    // In a real app, this would fetch from an API
    this.reviews = [
      {
        id: '1',
        reviewerName: 'John D.',
        rating: 5,
        date: 'March 15, 2023',
        service: 'Oil Change',
        vehicle: '2015 Honda Civic',
        location: 'Los Angeles, CA',
        reviewText:
          'Rocco was great! He arrived on time and was very professional. He explained everything he was doing and answered all my questions. I would definitely recommend him.',
        helpfulCount: 12,
      },
      {
        id: '2',
        reviewerName: 'Sarah M.',
        rating: 5,
        date: 'March 10, 2023',
        service: 'Brake Pads Replacement',
        vehicle: '2018 Toyota Camry',
        location: 'Los Angeles, CA',
        reviewText:
          'Excellent service! Rocco replaced my brake pads quickly and efficiently. He was very knowledgeable and explained the process clearly. Highly recommend!',
        helpfulCount: 8,
        mechanicResponse: "Thank you for your kind words! I'm glad I could help.",
      },
      {
        id: '3',
        reviewerName: 'Michael R.',
        rating: 5,
        date: 'March 5, 2023',
        service: 'Battery Replacement',
        vehicle: '2020 Ford F-150',
        location: 'Los Angeles, CA',
        reviewText:
          'My car battery died and Rocco came out same day. He tested everything and replaced the battery. Very professional and fair pricing.',
        helpfulCount: 15,
      },
      {
        id: '4',
        reviewerName: 'Emily T.',
        rating: 5,
        date: 'February 28, 2023',
        service: 'Pre-purchase Car Inspection',
        vehicle: '2017 BMW 3 Series',
        location: 'Los Angeles, CA',
        reviewText:
          'Rocco did a thorough inspection of a car I was considering buying. He found several issues that saved me from a bad purchase. Very detailed and honest.',
        helpfulCount: 20,
      },
      {
        id: '5',
        reviewerName: 'Chris L.',
        rating: 5,
        date: 'February 20, 2023',
        service: 'Check Engine Light Diagnostic',
        vehicle: '2019 Nissan Altima',
        location: 'Los Angeles, CA',
        reviewText:
          'Check engine light came on and Rocco diagnosed the issue quickly. He explained what was wrong and fixed it the same day. Great service!',
        helpfulCount: 10,
      },
    ];
  }

  loadRelatedMechanics(): void {
    this.relatedMechanics = [
      { id: 'art', name: 'ART', image: '', location: 'Los Angeles, CA' },
      { id: 'myo', name: 'MYO', image: '', location: 'Los Angeles, CA' },
      { id: 'paul', name: 'PAUL', image: '', location: 'Los Angeles, CA' },
    ];
  }

  async onYearChange(): Promise<void> {
    const year = this.quoteForm.get('vehicle')?.value;
    if (year && year.length === 4) {
      this.loadingMakes = true;
      this.makes = [];
      this.models = [];
      try {
        this.makes = await this.carDb.getMakes(parseInt(year));
      } catch (error) {
        console.error('Error loading makes:', error);
      } finally {
        this.loadingMakes = false;
      }
    }
  }

  async onMakeChange(): Promise<void> {
    const vehicle = this.quoteForm.get('vehicle')?.value;
    const parts = vehicle?.split(' ') || [];
    if (parts.length >= 2) {
      const year = parseInt(parts[0]);
      const make = parts.slice(1).join(' ');
      if (year && make) {
        this.loadingModels = true;
        this.models = [];
        try {
          this.models = await this.carDb.getModels(year, make);
        } catch (error) {
          console.error('Error loading models:', error);
        } finally {
          this.loadingModels = false;
        }
      }
    }
  }

  getQuote(): void {
    if (this.mechanic) {
      this.router.navigate(['/request'], {
        queryParams: {
          mechanicId: this.mechanic.id,
          mechanicName: this.mechanic.name,
        },
      });
    }
  }

  bookMechanic(): void {
    if (this.mechanic) {
      this.router.navigate(['/request'], {
        queryParams: {
          mechanicId: this.mechanic.id,
          mechanicName: this.mechanic.name,
        },
      });
    }
  }

  getStars(rating: number): number[] {
    return Array.from({ length: 5 }, (_, i) => i + 1);
  }
}

