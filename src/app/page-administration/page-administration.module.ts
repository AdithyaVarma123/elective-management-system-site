import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {FileUploadModule} from 'primeng/fileupload';
import { PageAdministrationComponent } from './page-administration.component';
import {ButtonModule} from "primeng/button";


const PageAdministrationRoutes: Routes = [
  {
    path: '',
    component: PageAdministrationComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PageAdministrationRoutes),
    ButtonModule,
    FileUploadModule
  ],
  declarations: [
    PageAdministrationComponent
  ]
})
export class PageAdministrationModule { }
