import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PageClassesComponent } from './page-classes.component';
import { CardModule } from "primeng/card";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";

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
        DialogModule
    ],
    declarations: [
        PageClassesComponent
    ]
})
export class PageClassesModule { }
