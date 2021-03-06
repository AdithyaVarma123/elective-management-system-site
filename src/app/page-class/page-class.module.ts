import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PageClassComponent } from './page-class.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TabViewModule } from 'primeng/tabview';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ProgressBarModule } from 'primeng/progressbar';

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
        ConfirmDialogModule,
        TabViewModule,
        FormsModule,
        InputTextModule,
        CalendarModule,
        ProgressSpinnerModule,
        RadioButtonModule,
        ProgressBarModule
    ],
    declarations: [PageClassComponent]
})
export class PageClassModule {}
