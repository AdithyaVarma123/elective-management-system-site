import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PageClassComponent } from './page-class.component';

const PageClassRoutes: Routes = [
  {
    path: '',
    component: PageClassComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PageClassRoutes)
  ],
  declarations: [
    PageClassComponent
  ]
})
export class PageClassModule { }
