import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PageElectivesComponent } from './page-electives.component';

const PageElectivesRoutes: Routes = [
  {
    path: '',
    component: PageElectivesComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PageElectivesRoutes)
  ],
  declarations: [
    PageElectivesComponent
  ]
})
export class PageElectivesModule { }
