import { Component, EventEmitter, Output, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-image24x24',
  templateUrl: './image24x24.component.html',
  styleUrls: ['./image24x24.component.css']
})
export class Image24x24Component implements  OnInit, OnDestroy {

  private sourceValue: String = undefined;

  @Output() sourceChange = new EventEmitter<String>();

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  @Input() get source(): String {
    return this.sourceValue;
  }

  set source(val: String) {
    this.sourceValue = val;
    this.sourceChange.emit(val);
  }
}
