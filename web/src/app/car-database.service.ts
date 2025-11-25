import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap, catchError, of } from 'rxjs';

interface NHTSAMake {
  Make_Name: string;
}

interface NHTSAModel {
  Model_Name: string;
}

export interface CarTrim {
  trim: string;
  engineType: string;
}

@Injectable({ providedIn: 'root' })
export class CarDatabaseService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://vpic.nhtsa.dot.gov/api/vehicles';

  /**
   * Get all vehicle makes for a given year
   * Uses NHTSA API (free, no auth required)
   * Simplified: returns common makes (NHTSA API can be slow, so we use a curated list)
   */
  getMakes(year: number): Promise<string[]> {
    // For now, return a comprehensive list of common makes
    // In production, you could cache this or use a faster API
    const commonMakes = [
      'Acura', 'Alfa Romeo', 'Aston Martin', 'Audi', 'Bentley', 'BMW', 'Buick', 'Cadillac',
      'Chevrolet', 'Chrysler', 'Dodge', 'Ferrari', 'Fiat', 'Ford', 'Genesis', 'GMC',
      'Honda', 'Hyundai', 'Infiniti', 'Jaguar', 'Jeep', 'Kia', 'Lamborghini', 'Land Rover',
      'Lexus', 'Lincoln', 'Maserati', 'Mazda', 'McLaren', 'Mercedes-Benz', 'Mini', 'Mitsubishi',
      'Nissan', 'Porsche', 'Ram', 'Rolls-Royce', 'Subaru', 'Tesla', 'Toyota', 'Volkswagen', 'Volvo'
    ];
    
    return Promise.resolve(commonMakes.sort());
  }

  /**
   * Get all models for a given year and make
   * Uses NHTSA API
   */
  getModels(year: number, make: string): Promise<string[]> {
    return new Promise((resolve) => {
      // First, get the Make ID
      this.http
        .get<{ Results: { Make_ID: number; Make_Name: string }[] }>(
          `${this.baseUrl}/GetMakesForMake/${encodeURIComponent(make)}?format=json`
        )
        .pipe(
          catchError(() => {
            // If that fails, try GetAllMakes and find the match
            return this.http.get<{ Results: { Make_ID: number; Make_Name: string }[] }>(
              `${this.baseUrl}/GetAllMakes?format=json`
            ).pipe(
              map((response) => ({
                Results: response.Results?.filter((m) => 
                  m.Make_Name.toLowerCase() === make.toLowerCase()
                ) || []
              }))
            );
          }),
          switchMap((makeResponse) => {
            const makeId = makeResponse.Results?.[0]?.Make_ID;
            if (!makeId) {
              console.warn(`Make ID not found for ${make}`);
              return of({ Results: [] });
            }
            return this.http.get<{ Results: NHTSAModel[] }>(
              `${this.baseUrl}/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
            );
          }),
          map((modelsResponse: any): string[] => {
            if (!modelsResponse || !modelsResponse.Results) {
              return [];
            }
            const models: string[] = (modelsResponse.Results as NHTSAModel[]).map((m) => m.Model_Name) || [];
            return [...new Set<string>(models)].sort(); // Remove duplicates and sort
          }),
          catchError((err): Observable<string[]> => {
            console.error('Error fetching models:', err);
            return of<string[]>([]);
          })
        )
        .subscribe({
          next: (models: string[]) => resolve(models),
        });
    });
  }

  /**
   * Get trims and engine types for a given year, make, and model
   * Note: NHTSA API doesn't provide trim/engine data directly
   * This is a simplified implementation - in production, you'd use a commercial API
   * or maintain a database of common trims/engines
   */
  getTrims(year: number, make: string, model: string): Promise<CarTrim[]> {
    return new Promise((resolve) => {
      // For now, return common trims with engine types
      // In production, this would query a database or commercial API
      const commonTrims = this.getCommonTrims(make, model, year);
      resolve(commonTrims);
    });
  }

  /**
   * Get common trims for popular makes/models
   * This is a simplified implementation - in production, use a proper database
   */
  private getCommonTrims(make: string, model: string, year: number): CarTrim[] {
    const makeLower = make.toLowerCase();
    const modelLower = model.toLowerCase();

    // Dodge Dart example
    if (makeLower === 'dodge' && modelLower === 'dart') {
      return [
        { trim: 'SE', engineType: '2.0L I4' },
        { trim: 'SXT', engineType: '2.4L I4' },
        { trim: 'GT', engineType: '2.4L I4' },
        { trim: 'Aero', engineType: '1.4L Turbo I4' },
      ];
    }

    // Honda Civic
    if (makeLower === 'honda' && modelLower === 'civic') {
      return [
        { trim: 'LX', engineType: '2.0L I4' },
        { trim: 'EX', engineType: '2.0L I4' },
        { trim: 'EX-L', engineType: '2.0L I4' },
        { trim: 'Si', engineType: '1.5L Turbo I4' },
        { trim: 'Type R', engineType: '2.0L Turbo I4' },
      ];
    }

    // Toyota Camry
    if (makeLower === 'toyota' && modelLower === 'camry') {
      return [
        { trim: 'LE', engineType: '2.5L I4' },
        { trim: 'SE', engineType: '2.5L I4' },
        { trim: 'XLE', engineType: '2.5L I4' },
        { trim: 'XSE', engineType: '3.5L V6' },
      ];
    }

    // Ford F-150
    if (makeLower === 'ford' && modelLower === 'f-150') {
      return [
        { trim: 'XL', engineType: '3.3L V6' },
        { trim: 'XLT', engineType: '2.7L Turbo V6' },
        { trim: 'Lariat', engineType: '3.5L Turbo V6' },
        { trim: 'King Ranch', engineType: '3.5L Turbo V6' },
        { trim: 'Platinum', engineType: '3.5L Turbo V6' },
      ];
    }

    // Default trims for unknown models
    return [
      { trim: 'Base', engineType: 'Standard Engine' },
      { trim: 'S', engineType: 'Standard Engine' },
      { trim: 'SE', engineType: 'Standard Engine' },
      { trim: 'LE', engineType: 'Standard Engine' },
      { trim: 'XLE', engineType: 'Standard Engine' },
    ];
  }
}

