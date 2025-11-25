import { Component } from '@angular/core';
import { ServicePageComponent } from '../../components/service-page/service-page.component';
import { ServicePageConfig } from '../../components/service-page/service-page.config';

@Component({
  selector: 'app-oil-change',
  standalone: true,
  imports: [ServicePageComponent],
  template: `<app-service-page [config]="config"></app-service-page>`,
})
export class OilChangeComponent {
  readonly config: ServicePageConfig = {
    title: 'Best Prices for Oil Change',
    subtitle: 'Get an instant quote for your car',
    ctaButtonText: 'GET A FREE QUOTE',
    pricingTable: [
      { car: 'Honda Civic', listingPrice: '$101.00', yourPrice: '$79.99' },
      { car: 'Toyota Camry', listingPrice: '$101.00', yourPrice: '$79.99' },
      { car: 'Ford F-150', listingPrice: '$101.00', yourPrice: '$79.99' },
      { car: 'BMW 3 Series', listingPrice: '$101.00', yourPrice: '$79.99' },
      { car: 'Mercedes-Benz C-Class', listingPrice: '$101.00', yourPrice: '$79.99' },
      { car: 'Audi A4', listingPrice: '$101.00', yourPrice: '$79.99' },
      { car: 'Chevrolet Silverado', listingPrice: '$101.00', yourPrice: '$77.99' },
    ],
    includedItems: [
      'Up to 5 quarts of oil',
      'New oil filter',
      'Fluid top-offs',
      '19-point safety inspection',
      'Tire pressure check',
      'Oil filter disposal',
    ],
    description: {
      title: 'Oil Change Service',
      content: [
        'An oil change is a routine maintenance service that involves draining old engine oil and replacing it with fresh oil, along with a new oil filter. Engine oil lubricates moving parts, reduces friction, and helps keep your engine clean and running efficiently.',
        'Regular oil changes are essential for maintaining engine health. Over time, oil breaks down and becomes contaminated with dirt, debris, and metal particles. Fresh oil ensures proper lubrication, prevents engine wear, and can improve fuel efficiency.',
      ],
      sections: [
        {
          title: 'What are the different types of oil?',
          content:
            'There are three main types of motor oil: conventional, synthetic blend, and full synthetic. Synthetic oil offers superior protection and performance, especially in extreme temperatures, and typically requires less frequent changes. Your vehicle\'s manufacturer specifies the recommended oil type in your owner\'s manual.',
        },
        {
          title: 'When should you get an oil change?',
          content:
            'Most vehicles require an oil change every 5,000 to 10,000 miles, depending on the oil type and driving conditions. Check your owner\'s manual for specific recommendations. Signs you may need an oil change include dark, dirty oil, engine noise, or the oil change indicator light.',
        },
        {
          title: 'How long does an oil change take?',
          content:
            'A mobile oil change typically takes 30-45 minutes. Our certified mechanics come to your location with all necessary equipment and supplies, so you can continue with your day while we service your vehicle.',
        },
      ],
    },
    articles: [
      {
        title: 'What are the symptoms of a bad oil change?',
        description: 'Learn about the signs that indicate you may need an oil change.',
      },
      {
        title: 'How much does an oil change cost?',
        description: 'Understanding the pricing for oil change services.',
      },
      {
        title: 'What are the different types of oil?',
        description: 'A guide to conventional, synthetic blend, and full synthetic oils.',
      },
    ],
  };
}
