import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PageLoginComponent } from './page-login.component';

const PageLoginRoutes: Routes = [
  {
    path: '',
    component: PageLoginComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PageLoginRoutes)
  ],
  declarations: [
    PageLoginComponent
  ]
})
export class PageLoginModule { }
