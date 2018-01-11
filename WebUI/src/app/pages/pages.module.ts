import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AtomsModule } from './../atoms/atoms.module';
import { MoleculesModule } from './../molecules/molecules.module';
import { OrganismsModule } from './../organisms/organisms.module';
import { PageAComponent } from './page-a/page-a.component';
import { PageBComponent } from './page-b/page-b.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/pagea', pathMatch: 'full' },
  { path: 'pagea', component: PageAComponent },
  { path: 'pageb', component: PageBComponent }
];

export const AppRouter: ModuleWithProviders = RouterModule.forRoot(appRoutes);

@NgModule({
  imports: [
    CommonModule,
    AppRouter,
    AtomsModule,
    MoleculesModule,
    OrganismsModule
  ],
  declarations: [
    PageAComponent,
    PageBComponent
  ],
  exports: [
    RouterModule,
    PageAComponent,
    PageBComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class PagesModule { }
