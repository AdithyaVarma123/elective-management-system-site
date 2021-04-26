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
import { TableModule } from 'primeng/table';
import { TabViewModule } from "primeng/tabview";
import { DropdownModule } from "primeng/dropdown";

const PageAdministrationRoutes: Routes = [
    {
        path: '',
        component: PageAdministrationComponent
    }
];

@NgModule({
    imports: [
        TableModule,
        HttpClientModule,
        InputTextModule,
        ButtonModule,
        FormsModule,
        CommonModule,
        RouterModule.forChild(PageAdministrationRoutes),
        ButtonModule,
        FileUploadModule,
        TabViewModule,
        DropdownModule
    ],
    declarations: [PageAdministrationComponent]
})
export class PageAdministrationModule {}
