import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FileUploadModule } from 'primeng/fileupload';
import { PageAdministrationComponent } from './page-administration.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { HttpClientModule } from '@angular/common/http';

const PageAdministrationRoutes: Routes = [
    {
        path: '',
        component: PageAdministrationComponent
    }
];

@NgModule({
    imports: [
        HttpClientModule,
        InputTextModule,
        ButtonModule,
        FormsModule,
        CommonModule,
        RouterModule.forChild(PageAdministrationRoutes),
        ButtonModule,
        FileUploadModule,
        AccordionModule
    ],
    declarations: [PageAdministrationComponent]
})
export class PageAdministrationModule {}
