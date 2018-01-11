import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { NgModel } from '@angular/forms';
import { Subscription, AnonymousSubscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { NetworkService } from './../../services/network.service';
import { WebService } from './../../services/web.service';
import { CordovaService } from './../../services/cordova.service';
import { Data } from './../../data.interface';

@Component({
  selector: 'app-page-a',
  templateUrl: './page-a.component.html',
  styleUrls: ['./page-a.component.css']
})
export class PageAComponent implements OnInit, OnDestroy {

  private networkSubscription: Subscription;
  private timerSubscription: AnonymousSubscription;
  private dataSubscription: AnonymousSubscription;
  
  data: Data;
  reverse: boolean;
  run: boolean;
  current?: number;
  engine?: number;
  wing?: number;
  tail?: number;
  anglea?: number;
  angleb?: number;


  constructor(public cordovaService: CordovaService,
              private networkService: NetworkService,
              private webService: WebService,
              private router: Router) {
    this.run == false;
    this.current = undefined;
    this.engine = undefined;
    this.wing = undefined;
    this.tail = undefined;
    this.anglea = undefined;
    this.angleb = undefined;
  }

  ngOnInit() {
    this.run = false;
    this.networkSubscription = this.networkService.networkSource$.subscribe(state => {
      if(state !== undefined && state.isOnline === true) {
        this.getData();
      } else {
        this.data = undefined;
        this.current = undefined;
      }
    });
  }

  ngOnDestroy() {
    this.networkSubscription.unsubscribe();
  }

  onChangeRun($event: boolean) {
    this.run = $event;
    if (this.run === $event) {
      this.getData();
    }
  }

  onChangeReverse($event: boolean) {
    this.reverse = $event;
  }

  private getData() {
    console.log('Call web:');
    if(this.run === true) {
      this.dataSubscription = this.webService.getData().subscribe(data => {
        console.log('Success:');
        this.data = data;
        if(this.reverse) {
          this.current = data.roll;
        } else {
          this.current = data.pitch;
        }
        this.subscribeToData();
      }, (err) => {
        console.log('Error:');
        console.log(err);
        console.log(JSON.stringify(err));
        this.data = undefined;
        this.current = undefined;
        this.subscribeToData();
      });
    } else  {
      this.data = undefined;
      this.current = undefined;
      this.subscribeToData();
    }
  }

  private subscribeToData(): void {
    if(this.run === true) {
      this.timerSubscription = Observable.timer(200).first().subscribe(() => this.getData());
    }
  }

  onButtonEngine() {
    this.engine = this.current;
    if (this.engine !== undefined && this.wing !== undefined) {
      this.anglea = this.engine - this.wing;
    } else {
      this.anglea = undefined;
    }
  }

  onButtonWingClick() {
    this.wing = this.current;
    if (this.engine !== undefined && this.wing !== undefined) {
      this.anglea = this.engine - this.wing;
    } else {
      this.anglea = undefined;
    }
    if (this.tail !== undefined && this.wing !== undefined) {
      this.angleb = this.wing - this.tail;
    } else {
      this.angleb = undefined;
    }
  }

  onButtonTailClick() {
    this.tail = this.current;
    if (this.tail !== undefined && this.wing !== undefined) {
      this.angleb = this.wing - this.tail;
    } else {
      this.angleb = undefined;
    }
  }
}
