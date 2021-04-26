import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PageElectivesComponent } from './page-electives.component';
import { TableModule } from "primeng/table";
import { TabViewModule } from "primeng/tabview";
import { FormsModule } from "@angular/forms";
import { FileUploadModule } from "primeng/fileupload";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { InputTextareaModule } from "primeng/inputtextarea";
import { DialogModule } from "primeng/dialog";
import { ConfirmDialogModule } from "primeng/confirmdialog";

const PageElectivesRoutes: Routes = [
    {
        path: '',
        component: PageElectivesComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PageElectivesRoutes),
        TableModule,
        TabViewModule,
        FormsModule,
        FileUploadModule,
        InputTextModule,
        ButtonModule,
        InputTextareaModule,
        DialogModule,
        ConfirmDialogModule
    ],
    declarations: [
        PageElectivesComponent
    ]
})
export class PageElectivesModule { }
