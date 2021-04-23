import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PageClassesComponent } from './page-classes.component';

const PageClassesRoutes: Routes = [
  {
    path: '',
    component: PageClassesComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PageClassesRoutes)
  ],
  declarations: [
    PageClassesComponent
  ]
})
export class PageClassesModule { }
