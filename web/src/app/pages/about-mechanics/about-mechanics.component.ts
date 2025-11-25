import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Mechanic {
  id: string;
  name: string;
  image: string;
  rating: number;
  yearsExperience: number;
  reviewCount: number;
  certifications: string[];
  badges: string[];
}

@Component({
  selector: 'app-about-mechanics',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './about-mechanics.component.html',
  styleUrl: './about-mechanics.component.scss',
})
export class AboutMechanicsComponent {
  readonly featuredMechanics: Mechanic[] = [
    {
      id: '1',
      name: 'Rocco',
      image: '',
      rating: 5,
      yearsExperience: 26,
      reviewCount: 303,
      certifications: ['ASE'],
      badges: [],
    },
    {
      id: '2',
      name: 'Robert',
      image: '',
      rating: 5,
      yearsExperience: 35,
      reviewCount: 675,
      certifications: ['ASE'],
      badges: ['Top Rated', 'Expert'],
    },
    {
      id: '3',
      name: 'Grzegorz',
      image: '',
      rating: 5,
      yearsExperience: 45,
      reviewCount: 473,
      certifications: [],
      badges: ['Top Rated', 'Expert'],
    },
  ];

  generateSlug(name: string): string {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  readonly approvedMechanics: Mechanic[] = [
    {
      id: '4',
      name: 'Robert',
      image: '',
      rating: 5,
      yearsExperience: 26,
      reviewCount: 450,
      certifications: [],
      badges: [],
    },
    {
      id: '5',
      name: 'Teresa',
      image: '',
      rating: 5,
      yearsExperience: 15,
      reviewCount: 320,
      certifications: [],
      badges: [],
    },
    {
      id: '6',
      name: 'Dillon',
      image: '',
      rating: 5,
      yearsExperience: 12,
      reviewCount: 280,
      certifications: [],
      badges: [],
    },
  ];

  getStars(rating: number): number[] {
    return Array.from({ length: 5 }, (_, i) => i + 1);
  }
}

