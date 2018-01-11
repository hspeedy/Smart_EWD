import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AtomsModule } from './../atoms/atoms.module';
import { MoleculesModule } from './../molecules/molecules.module';

@NgModule({
  imports: [
    CommonModule,
    AtomsModule,
    MoleculesModule
  ],
  declarations: [

  ],
  exports: [

  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class OrganismsModule { }
