import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppModule);

console.log('Environment: ' + environment.cordova);
if (environment.cordova) {
  console.log('using cordova bootstrap');

  document.addEventListener('deviceready', () => {
    bootstrap();
    document.addEventListener('online', () => {
      window.network.stateChanged();
    }, false);
    document.addEventListener('offline', () => {
      window.network.stateChanged();
    }, false);
  }, false);
} else {
  console.log('using default bootstrap');
  bootstrap();
}
