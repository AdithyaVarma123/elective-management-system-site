import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PageClassesComponent } from './page-classes.component';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TabViewModule } from 'primeng/tabview';

const PageClassesRoutes: Routes = [
    {
        path: '',
        component: PageClassesComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PageClassesRoutes),
        CardModule,
        TableModule,
        ButtonModule,
        DialogModule,
        DropdownModule,
        FormsModule,
        ConfirmDialogModule,
        TabViewModule
    ],
    declarations: [PageClassesComponent]
})
export class PageClassesModule {}
