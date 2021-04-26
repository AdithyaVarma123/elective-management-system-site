import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FileUploadModule } from 'primeng/fileupload';
import { PageAdministrationComponent } from './page-administration.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { TabViewModule } from "primeng/tabview";
import { DropdownModule } from "primeng/dropdown";
import { ChipModule } from "primeng/chip";
import { CardModule } from "primeng/card";
import { InputTextareaModule } from "primeng/inputtextarea";

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
        DropdownModule,
        ChipModule,
        CardModule,
        InputTextareaModule
    ],
    declarations: [PageAdministrationComponent]
})
export class PageAdministrationModule {}
