import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface ServiceCard {
  title: string;
  description: string;
}

interface Testimonial {
  quote: string;
  name: string;
  job: string;
}

interface City {
  name: string;
  state: string;
}

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent {
  readonly serviceCards: ServiceCard[] = [
    {
      title: 'Car not starting diagnostic',
      description:
        'Our mobile technicians run full electrical and mechanical diagnostics to get you back on the road.',
    },
    {
      title: 'Oil change & filter',
      description:
        'Keep your engine running smoothly with manufacturer-recommended oil and filter service at your home or office.',
    },
    {
      title: 'Brake service',
      description:
        'From pads to rotors, we deliver certified brake inspection and repair with upfront pricing.',
    },
    {
      title: 'Battery replacement',
      description:
        'Stress-free testing, delivery, and installation of top-rated batteries—no tow truck required.',
    },
    {
      title: 'Pre-purchase inspection',
      description:
        'Shopping for a vehicle? Our mechanics perform thorough inspections so you can buy with confidence.',
    },
    {
      title: 'Fleet maintenance',
      description:
        'Scale preventative maintenance for your vehicles with flexible scheduling and standardized reporting.',
    },
  ];

  readonly steps = [
    {
      title: 'Tell us what you need',
      description:
        'Request a service or diagnostic, share your vehicle details, and pick the best time for you.',
    },
    {
      title: 'We dispatch a top-rated mechanic',
      description:
        'Certified technicians arrive at your home or office with the tools and parts to get the job done.',
    },
    {
      title: 'Authorize payment when complete',
      description:
        'We only capture the $60 authorization once the service is finished and you’re satisfied.',
    },
  ];

  readonly testimonials: Testimonial[] = [
    {
      quote:
        'Everything was handled in my driveway. No shop visits, no surprises. The mechanic walked me through every step.',
      name: 'Avery T.',
      job: 'Brake replacement client',
    },
    {
      quote:
        'They inspected the van we use for deliveries, fixed the failing alternator, and had us back on route the same day.',
      name: 'Jordan M.',
      job: 'Local florist owner',
    },
    {
      quote:
        'Transparent pricing, professional communication, and the convenience of not leaving home—couldn’t ask for more.',
      name: 'Lina P.',
      job: 'Oil change customer',
    },
  ];

  readonly cities: City[] = [
    { name: 'Phoenix', state: 'AZ' },
    { name: 'San Diego', state: 'CA' },
    { name: 'Austin', state: 'TX' },
    { name: 'Seattle', state: 'WA' },
    { name: 'Denver', state: 'CO' },
    { name: 'Atlanta', state: 'GA' },
    { name: 'Orlando', state: 'FL' },
    { name: 'Chicago', state: 'IL' },
    { name: 'New York City', state: 'NY' },
    { name: 'Nashville', state: 'TN' },
    { name: 'Las Vegas', state: 'NV' },
    { name: 'Portland', state: 'OR' },
  ];
}

