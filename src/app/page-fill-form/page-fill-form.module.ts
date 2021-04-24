import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PageFillFormComponent } from './page-fill-form.component';
import { CardModule } from "primeng/card";
import { PickListModule } from "primeng/picklist";
import { ButtonModule } from "primeng/button";
import { ConfirmDialogModule } from "primeng/confirmdialog";

const PageFillFormRoutes: Routes = [
    {
        path: '',
        component: PageFillFormComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PageFillFormRoutes),
        CardModule,
        PickListModule,
        ButtonModule,
        ConfirmDialogModule
    ],
    declarations: [
        PageFillFormComponent
    ]
})
export class PageFillFormModule { }
