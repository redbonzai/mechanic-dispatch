import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  postDate: string;
  type: string;
  description: string;
  requirements: string[];
}

@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './careers.component.html',
  styleUrl: './careers.component.scss',
})
export class CareersComponent {
  private readonly fb = inject(FormBuilder);

  searchForm = this.fb.group({
    search: [''],
    department: ['all'],
    location: ['all'],
  });

  readonly departments = [
    'All Departments',
    'Mobile Mechanics',
    'Fleet Services',
    'Management',
    'Support',
  ];

  readonly locations = [
    'All Locations',
    'Los Angeles, CA',
    'San Francisco, CA',
    'San Diego, CA',
    'Austin, TX',
    'Phoenix, AZ',
    'Seattle, WA',
    'Denver, CO',
    'Miami, FL',
    'Remote',
  ];

  allJobs: JobPosition[] = [
    {
      id: '1',
      title: 'Mobile Automotive Technician',
      department: 'Mobile Mechanics',
      location: 'Los Angeles, CA',
      postDate: '2024-01-15',
      type: 'Full-time',
      description:
        'Join our team as a mobile automotive technician. Provide on-site car repair and maintenance services to customers at their homes or offices.',
      requirements: [
        'ASE Certification preferred',
        'Minimum 5 years of experience',
        'Valid driver\'s license and reliable vehicle',
        'Own tools and equipment',
        'Excellent customer service skills',
      ],
    },
    {
      id: '2',
      title: 'Senior Mobile Mechanic',
      department: 'Mobile Mechanics',
      location: 'San Francisco, CA',
      postDate: '2024-01-14',
      type: 'Full-time',
      description:
        'Lead mobile mechanic position for experienced professionals. Handle complex diagnostics and repairs while mentoring junior technicians.',
      requirements: [
        'ASE Master Technician certification',
        'Minimum 10 years of experience',
        'Leadership experience preferred',
        'Advanced diagnostic skills',
        'Clean driving record',
      ],
    },
    {
      id: '3',
      title: 'Mobile Battery Specialist',
      department: 'Mobile Mechanics',
      location: 'San Diego, CA',
      postDate: '2024-01-13',
      type: 'Full-time',
      description:
        'Specialize in battery testing, replacement, and electrical system diagnostics. Fast-paced role with high customer satisfaction focus.',
      requirements: [
        'ASE Electrical/Electronic Systems certification',
        '3+ years battery/electrical experience',
        'Strong diagnostic abilities',
        'Customer-focused attitude',
      ],
    },
    {
      id: '4',
      title: 'Fleet Maintenance Technician',
      department: 'Fleet Services',
      location: 'Austin, TX',
      postDate: '2024-01-12',
      type: 'Full-time',
      description:
        'Maintain and service commercial vehicle fleets. Work with businesses to keep their vehicles running efficiently.',
      requirements: [
        'Commercial vehicle experience',
        'ASE certifications',
        'Fleet maintenance background preferred',
        'Strong organizational skills',
      ],
    },
    {
      id: '5',
      title: 'Mobile Oil Change Technician',
      department: 'Mobile Mechanics',
      location: 'Phoenix, AZ',
      postDate: '2024-01-11',
      type: 'Part-time',
      description:
        'Fast-paced role performing mobile oil changes and basic maintenance. Perfect for technicians looking for flexible scheduling.',
      requirements: [
        'Basic automotive knowledge',
        '1+ years experience',
        'Reliable transportation',
        'Ability to work independently',
      ],
    },
    {
      id: '6',
      title: 'Diagnostic Specialist',
      department: 'Mobile Mechanics',
      location: 'Seattle, WA',
      postDate: '2024-01-10',
      type: 'Full-time',
      description:
        'Expert in vehicle diagnostics and troubleshooting. Use advanced scan tools and technical knowledge to identify and explain vehicle issues.',
      requirements: [
        'ASE Engine Performance certification',
        'Advanced diagnostic training',
        '5+ years diagnostic experience',
        'Strong technical communication skills',
      ],
    },
    {
      id: '7',
      title: 'Mobile Brake Specialist',
      department: 'Mobile Mechanics',
      location: 'Denver, CO',
      postDate: '2024-01-09',
      type: 'Full-time',
      description:
        'Specialize in brake system inspection, repair, and replacement. Provide expert brake services to customers on-site.',
      requirements: [
        'ASE Brakes certification',
        '3+ years brake system experience',
        'Thorough knowledge of brake systems',
        'Detail-oriented approach',
      ],
    },
    {
      id: '8',
      title: 'Remote Customer Support Specialist',
      department: 'Support',
      location: 'Remote',
      postDate: '2024-01-08',
      type: 'Full-time',
      description:
        'Provide customer support via phone and email. Help customers schedule services, answer questions, and resolve issues.',
      requirements: [
        'Excellent communication skills',
        'Customer service experience',
        'Basic automotive knowledge',
        'Ability to work from home',
      ],
    },
    {
      id: '9',
      title: 'Regional Operations Manager',
      department: 'Management',
      location: 'Miami, FL',
      postDate: '2024-01-07',
      type: 'Full-time',
      description:
        'Manage regional operations, coordinate mechanics, and ensure service quality across multiple markets.',
      requirements: [
        'Management experience',
        'Automotive industry background',
        'Strong leadership skills',
        'Business operations knowledge',
      ],
    },
  ];

  displayedJobs: JobPosition[] = [...this.allJobs];


  onSearchChange(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    const { search, department, location } = this.searchForm.value;
    let filtered = [...this.allJobs];

    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchLower) ||
          job.description.toLowerCase().includes(searchLower) ||
          job.location.toLowerCase().includes(searchLower),
      );
    }

    if (department && department !== 'all') {
      filtered = filtered.filter((job) => job.department === department);
    }

    if (location && location !== 'all') {
      filtered = filtered.filter((job) => job.location === location);
    }

    this.displayedJobs = filtered;
  }

  getJobCount(): number {
    return this.displayedJobs.length;
  }
}

