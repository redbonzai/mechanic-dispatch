import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface ServiceCategory {
  title: string;
  description: string;
  route: string;
  icon?: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent {
  readonly featuredServices: ServiceCategory[] = [
    {
      title: 'Oil Change',
      description: 'Professional mobile oil change service with quality oil and filter replacement at your location.',
      route: '/services/oil-change',
    },
    {
      title: 'Car is not starting Diagnostic',
      description: 'Comprehensive diagnostic service to identify why your car won\'t start. Battery, starter, alternator, and more.',
      route: '/request',
    },
    {
      title: 'Battery Replacement',
      description: 'Fast battery testing, delivery, and installation. No tow truck required.',
      route: '/request',
    },
    {
      title: 'Pre-purchase Car Inspection',
      description: 'Thorough inspection before you buy. Get peace of mind with our certified mechanics.',
      route: '/request',
    },
    {
      title: 'Check engine light is on Diagnostic',
      description: 'Expert diagnostic service to identify and explain what\'s causing your check engine light.',
      route: '/request',
    },
    {
      title: 'Brake Pad Replacement',
      description: 'Professional brake service including pads, rotors, and fluid inspection. Transparent pricing.',
      route: '/request',
    },
    {
      title: 'Towing and Roadside',
      description: '24/7 roadside assistance including towing, jump starts, tire changes, and lockout service.',
      route: '/request',
    },
  ];

  readonly allServices: ServiceCategory[] = [
    { title: 'Oil Change', description: 'Mobile oil change with quality oil and filter', route: '/request' },
    { title: 'Battery Replacement', description: 'Battery testing and installation', route: '/request' },
    { title: 'Brake Service', description: 'Brake pad and rotor replacement', route: '/request' },
    { title: 'Tire Replacement', description: 'Tire installation and balancing', route: '/request' },
    { title: 'AC Repair', description: 'Air conditioning system diagnosis and repair', route: '/request' },
    { title: 'Transmission Service', description: 'Transmission fluid change and repair', route: '/request' },
    { title: 'Engine Diagnostic', description: 'Comprehensive engine diagnostics', route: '/request' },
    { title: 'Electrical System', description: 'Electrical diagnostics and repair', route: '/request' },
    { title: 'Cooling System', description: 'Radiator and cooling system service', route: '/request' },
    { title: 'Fuel System', description: 'Fuel pump, filter, and injector service', route: '/request' },
    { title: 'Suspension Repair', description: 'Shocks, struts, and suspension components', route: '/request' },
    { title: 'Exhaust System', description: 'Muffler and exhaust pipe repair', route: '/request' },
  ];
}

