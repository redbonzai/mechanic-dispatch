import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarDatabaseService } from '../../car-database.service';
import { ServicePageConfig } from './service-page.config';

@Component({
  selector: 'app-service-page',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './service-page.component.html',
  styleUrl: './service-page.component.scss',
})
export class ServicePageComponent implements OnInit {
  @Input({ required: true }) config!: ServicePageConfig;

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly carDb = inject(CarDatabaseService);

  carForm = this.fb.group({
    year: ['', Validators.required],
    make: ['', Validators.required],
    model: ['', Validators.required],
    trim: [''],
    engineType: [''],
  });

  years: number[] = [];
  makes: string[] = [];
  models: string[] = [];
  trims: Array<{ trim: string; engineType: string }> = [];
  loadingMakes = false;
  loadingModels = false;
  loadingTrims = false;
  selectedEngineType = '';

  ngOnInit(): void {
    this.loadYears();
  }

  async loadYears(): Promise<void> {
    const currentYear = new Date().getFullYear();
    this.years = Array.from({ length: currentYear - 1990 + 1 }, (_, i) => currentYear - i);
  }

  async onYearChange(): Promise<void> {
    const year = this.carForm.get('year')?.value;
    if (year) {
      this.loadingMakes = true;
      this.makes = [];
      this.models = [];
      this.trims = [];
      this.carForm.patchValue({ make: '', model: '', trim: '', engineType: '' });
      this.selectedEngineType = '';
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
    const year = this.carForm.get('year')?.value;
    const make = this.carForm.get('make')?.value;
    if (year && make) {
      this.loadingModels = true;
      this.models = [];
      this.trims = [];
      this.carForm.patchValue({ model: '', trim: '', engineType: '' });
      this.selectedEngineType = '';
      try {
        this.models = await this.carDb.getModels(parseInt(year), make);
      } catch (error) {
        console.error('Error loading models:', error);
      } finally {
        this.loadingModels = false;
      }
    }
  }

  async onModelChange(): Promise<void> {
    const year = this.carForm.get('year')?.value;
    const make = this.carForm.get('make')?.value;
    const model = this.carForm.get('model')?.value;
    if (year && make && model) {
      this.loadingTrims = true;
      this.trims = [];
      this.carForm.patchValue({ trim: '', engineType: '' });
      this.selectedEngineType = '';
      try {
        this.trims = await this.carDb.getTrims(parseInt(year), make, model);
      } catch (error) {
        console.error('Error loading trims:', error);
      } finally {
        this.loadingTrims = false;
      }
    }
  }

  onTrimChange(): void {
    const trim = this.carForm.get('trim')?.value;
    if (trim) {
      const selectedTrim = this.trims.find((t) => t.trim === trim);
      if (selectedTrim) {
        this.selectedEngineType = selectedTrim.engineType;
        this.carForm.patchValue({ engineType: selectedTrim.engineType });
      }
    } else {
      this.selectedEngineType = '';
      this.carForm.patchValue({ engineType: '' });
    }
  }

  getQuote(): void {
    if (this.carForm.valid) {
      const { year, make, model, trim, engineType } = this.carForm.value;
      const queryParams: Record<string, string> = {};
      if (year) queryParams.year = year;
      if (make) queryParams.make = make;
      if (model) queryParams.model = model;
      if (trim) queryParams.trim = trim;
      if (engineType) queryParams.engineType = engineType;
      this.router.navigate(['/request'], { queryParams });
    }
  }
}

