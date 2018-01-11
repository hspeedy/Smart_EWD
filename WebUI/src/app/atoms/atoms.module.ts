import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Image16x16Component } from './image16x16/image16x16.component';
import { Image24x24Component } from './image24x24/image24x24.component';
import { ButtonComponent } from './button/button.component';
import { SwitchComponent } from './switch/switch.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    Image16x16Component,
    Image24x24Component,
    ButtonComponent,
    SwitchComponent
  ],
  exports: [
    Image16x16Component,
    Image24x24Component,
    ButtonComponent,
    SwitchComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AtomsModule { }
