import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { AppConfig } from './app-config';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private static loadedConfig: AppConfig | null = null;

  constructor(private readonly http: HttpClient) {}

  async load(): Promise<void> {
    if (ConfigService.loadedConfig) return;
    const cfg = await firstValueFrom(this.http.get<AppConfig>('/assets/app-config.json'));
    ConfigService.loadedConfig = cfg;
  }

  static get config(): AppConfig {
    if (!ConfigService.loadedConfig) {
      throw new Error('App configuration not loaded');
    }
    return ConfigService.loadedConfig;
  }
}








