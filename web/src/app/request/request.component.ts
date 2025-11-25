import { Component, AfterViewInit, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { APP_CONFIG, AppConfig } from '../app-config';

declare const Stripe: any;

@Component({
  selector: 'app-request',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './request.component.html',
})
export class RequestComponent implements OnInit, AfterViewInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly api = inject(ApiService);
  private readonly appConfig = inject<AppConfig>(APP_CONFIG);
  private readonly route = inject(ActivatedRoute);

  form = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    addressLine1: ['', Validators.required],
    addressLine2: [''],
    city: ['', Validators.required],
    state: ['', Validators.required],
    postalCode: ['', Validators.required],
    country: ['US'],
    vehicleMake: ['', Validators.required],
    vehicleModel: ['', Validators.required],
    vehicleYear: [new Date().getFullYear(), [Validators.required, Validators.min(1900)]],
    vehicleTrim: [''],
    vehicleEngineType: [''],
  });

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['year']) {
        this.form.patchValue({ vehicleYear: parseInt(params['year']) });
      }
      if (params['make']) {
        this.form.patchValue({ vehicleMake: params['make'] });
      }
      if (params['model']) {
        this.form.patchValue({ vehicleModel: params['model'] });
      }
      if (params['trim']) {
        this.form.patchValue({ vehicleTrim: params['trim'] });
      }
      if (params['engineType']) {
        this.form.patchValue({ vehicleEngineType: params['engineType'] });
      }
    });
  }

  stripe: any;
  elements: any;
  card: any;
  isSubmitting = false;
  requestId = '';

  ngAfterViewInit(): void {
    const publishableKey = this.appConfig.stripePublishableKey ?? 'pk_test_replace_me';

    this.stripe = Stripe(publishableKey);
    this.elements = this.stripe.elements();
    this.card = this.elements.create('card');
    this.card.mount('#card-element');
  }

  async submit(): Promise<void> {
    if (this.form.invalid || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;

    try {
      const payload = this.form.getRawValue();
      const response = await this.api.createRequest(payload).toPromise();

      if (!response?.clientSecret) {
        throw new Error('Unable to authorize payment.');
      }

      this.requestId = response.requestId;

      const confirmation = await this.stripe.confirmCardPayment(response.clientSecret, {
        payment_method: {
          card: this.card,
          billing_details: {
            email: payload.email,
            name: `${payload.firstName} ${payload.lastName}`,
            phone: payload.phone,
          },
        },
      });

      if (confirmation.error) {
        throw confirmation.error;
      }

      const status = confirmation.paymentIntent?.status;

      if (status === 'requires_capture' || status === 'processing') {
        alert(`Payment authorized. Request ID: ${this.requestId}`);
      } else {
        alert(`Unexpected payment status: ${status}`);
      }
    } catch (error: any) {
      alert(error?.message ?? 'Something went wrong while submitting your request.');
    } finally {
      this.isSubmitting = false;
    }
  }
}

