import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';
import { ApplicationMode } from '../application-mode.enum';
import { NetworkService } from './network.service';

@Injectable()
export class CordovaService {

  private readyValue                            = false;
  private deviceValue: Device                   = undefined;
  private uuid: string                          = undefined;
  private applicationMode: ApplicationMode      = ApplicationMode.UNDEFINED;
  private readySource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public readySource$: Observable<boolean>      = this.readySource.asObservable();

  constructor(private networkService: NetworkService) {
  }

  initializeService() {
    return new Promise<boolean>((resolve, reject) => {
      if (typeof device !== 'undefined') {
        this.deviceValue = device;
        if (device.platform !== 'browser') {
          this.uuid = device.uuid;
          this.applicationMode = ApplicationMode.CORDOVAAPP;
        } else {
          this.applicationMode = ApplicationMode.CORDOVABROWSER;
        }
        resolve(true);
      } else {
        if (environment.cordova) {
          reject('Application is Cordova, but Cordova is absent!');
        } else {
          this.applicationMode = ApplicationMode.WEB;
          resolve(true);
        }
      }
      this.networkService.stateChanged();
      if (this.applicationMode === ApplicationMode.CORDOVAAPP) {
        resolve(true);
      } else if (this.applicationMode === ApplicationMode.CORDOVABROWSER) {
        resolve(true);
      } else {
        reject('Unknown error!');
      }
    });
  }

  get ready(): boolean {
    return this.readyValue;
  }

  set ready(val: boolean) {
    this.readyValue = val;
    this.readySource.next(val);
  }

  get mode(): ApplicationMode {
    return this.applicationMode;
  }

  get isCordova(): boolean {
    return this.applicationMode === ApplicationMode.CORDOVAAPP || this.applicationMode === ApplicationMode.CORDOVABROWSER;
  }

  get isCordovaApp(): boolean {
    return this.applicationMode === ApplicationMode.CORDOVAAPP;
  }
}
