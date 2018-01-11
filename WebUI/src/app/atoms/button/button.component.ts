import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit, OnDestroy {

  @Output() clickChange = new EventEmitter();

  @Input() disabled: boolean;

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  click() {
    this.clickChange.emit();
  }
}
