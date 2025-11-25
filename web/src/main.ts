import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { APP_INITIALIZER } from '@angular/core';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { APP_CONFIG } from './app/app-config';
import { ConfigService } from './app/config.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: (cfg: ConfigService) => () => cfg.load(),
      deps: [ConfigService],
      multi: true,
    },
    {
      provide: APP_CONFIG,
      useFactory: () => ConfigService.config,
    },
  ],
}).catch((err) => console.error(err));

