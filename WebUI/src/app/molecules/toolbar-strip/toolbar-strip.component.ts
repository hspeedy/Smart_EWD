import { Component, EventEmitter, Output, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { NetworkService } from './../../services/network.service';
import { CordovaService } from './../../services/cordova.service';

@Component({
  selector: 'app-toolbar-strip',
  templateUrl: './toolbar-strip.component.html',
  styleUrls: ['./toolbar-strip.component.css']
})
export class ToolbarStripComponent implements OnInit, OnDestroy {

  private networkValue: String = undefined;
  private titleValue: String = undefined;
  private networkSubscription: Subscription;

  @Output() titleChange = new EventEmitter<String>();
  @Output() networkChange = new EventEmitter<String>();

  constructor(private cordovaService: CordovaService, private networkService: NetworkService) {
  }

  ngOnInit() {
    this.networkSubscription = this.networkService.networkSource$.subscribe(state => {
      if (this.cordovaService.isCordova === true && state !== undefined && state.isOnline === true) {
        this.network = 'assets/ic_network_wifi_24px.svg';
      } else {
        this.network = 'assets/ic_signal_wifi_off_24px.svg';
      }
    });
  }

  ngOnDestroy() {
    this.networkSubscription.unsubscribe();
  }

  @Input() get title(): String {
    return this.titleValue;
  }

  set title(val: String) {
    this.titleValue = val;
    this.titleChange.emit(val);
  }

  @Input() get network(): String {
    return this.networkValue;
  }

  set network(val: String) {
    this.networkValue = val;
    this.networkChange.emit(val);
  }

  onSettings() {
    console.log('settings');
  }
}
