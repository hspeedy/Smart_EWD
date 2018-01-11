import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

import { CordovaService } from './services/cordova.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Smart EWD';

  private readySubscription: Subscription;
  private readyValue = false;

  constructor(public cordovaService: CordovaService,
              private router: Router) {

  }

  ngOnInit() {
    this.readySubscription = this.cordovaService.readySource$.subscribe(ready => {
      this.ready = ready;
    });

    setTimeout(() => {
      this.cordovaService.initializeService().then(value => {
        console.log('CordovaService initialized');
        this.cordovaService.ready = true;
        this.initializationFinished();
      }).catch((message: string) => {
        console.log('CordovaService initialize failed: ' + message);
        this.cordovaService.ready = false;
        this.initializationFinished();
      });
    }, 200);
  }

  ngOnDestroy() {
    this.readySubscription.unsubscribe();
  }

  initializationFinished() {
    const init = document.getElementById('init');

    init.parentElement.removeChild(init);
  }

  get ready(): boolean {
    return this.readyValue;
  }

  set ready(val: boolean) {
    this.readyValue = val;
  }

  onButtonAClick() {
    console.log('Button A click!');
    this.router.navigate(['pagea']);
  }

  onButtonBClick() {
    console.log('Button B click!');
    this.router.navigate(['pageb']);
  }
}
