import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CordovaService } from './cordova.service';
import { NetworkService } from './network.service';
import { WebService } from './web.service';
import { SettingsService } from './settings.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    NetworkService,
    WebService,
    CordovaService,
    SettingsService
  ]
})
export class ServicesModule { }
