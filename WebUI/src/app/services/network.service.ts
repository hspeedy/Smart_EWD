import { Injectable, NgZone, OnDestroy  } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NetworkService implements OnDestroy {

  private networkSource: BehaviorSubject<NetworkState>  = new BehaviorSubject<NetworkState>(undefined);
  public networkSource$: Observable<NetworkState> = this.networkSource.asObservable();

  constructor(private ngZone: NgZone) {
    window.network = window.network || {
      stateChanged: this.publicStateChanged.bind(this),
    };
  }

  ngOnDestroy() {
    window.network.stateChanged  = null;
  }

  publicStateChanged() {
    this.ngZone.run(() => this.stateChanged());
  }

  stateChanged() {
    const state: NetworkState = { state: '', isOnline: false };
    const networkState        = navigator.connection.type;
    const states              = {};

    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';
    if (networkState === Connection.WIFI) {
      state.isOnline = true;
    }
    state.state = states[networkState];
    console.log('Connection changed: ' + JSON.stringify(state));
    this.networkSource.next(state);
  }
}
