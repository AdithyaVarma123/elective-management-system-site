import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PageClassComponent } from './page-class.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

const PageClassRoutes: Routes = [
    {
        path: '',
        component: PageClassComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PageClassRoutes),
        TableModule,
        ButtonModule,
        DialogModule,
        FileUploadModule,
        ConfirmDialogModule
    ],
    declarations: [PageClassComponent]
})
export class PageClassModule {}
