import { Injectable, EventEmitter, Input, Output } from '@angular/core';

@Injectable()
export class SettingsService {

  private reverseValue: boolean;

  @Output() reverseChange = new EventEmitter<boolean>();

  constructor() { 
    this.reverse = false;
  }

  @Input() set reverse(val: boolean) {
    this.reverseValue = val;
    this.reverseChange.emit(val);
  };

  get reverse() {
    return this.reverseValue;
  }

}
