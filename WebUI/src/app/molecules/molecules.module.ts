import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AtomsModule } from './../atoms/atoms.module';
import { ToolbarStripComponent } from './toolbar-strip/toolbar-strip.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  imports: [
    CommonModule,
    AtomsModule,
    NgbModule
  ],
  declarations: [
    ToolbarStripComponent,
    SettingsComponent
  ],
  exports: [
    ToolbarStripComponent,
    SettingsComponent
  ],
  entryComponents: [
    SettingsComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class MoleculesModule { }
