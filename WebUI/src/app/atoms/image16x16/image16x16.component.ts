import { Component, EventEmitter, Output, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-image16x16',
  templateUrl: './image16x16.component.html',
  styleUrls: ['./image16x16.component.css']
})
export class Image16x16Component implements  OnInit, OnDestroy {

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
