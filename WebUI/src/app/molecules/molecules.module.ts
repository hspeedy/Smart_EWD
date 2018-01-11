import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AtomsModule } from './../atoms/atoms.module';
import { ToolbarStripComponent } from './toolbar-strip/toolbar-strip.component';

@NgModule({
  imports: [
    CommonModule,
    AtomsModule
  ],
  declarations: [
    ToolbarStripComponent
  ],
  exports: [
    ToolbarStripComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class MoleculesModule { }
