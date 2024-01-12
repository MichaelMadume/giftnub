import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';
import { NbLayoutDirection, NbThemeModule } from '@nebular/theme';
import { DEFAULT_THEME } from '../styles/theme.default';
import { DARK_THEME } from '../styles/theme.dark';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes), provideServiceWorker('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
    }),    importProvidersFrom(
      NbThemeModule.forRoot(
        {
          name: window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'default',
        },
        [DEFAULT_THEME, DARK_THEME],
        undefined,
        NbLayoutDirection.LTR
      )
    ),],
};
