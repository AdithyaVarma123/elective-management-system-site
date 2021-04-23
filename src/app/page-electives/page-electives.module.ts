import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PageElectivesComponent } from './page-electives.component';
import { CardModule } from "primeng/card";
import { TabViewModule } from "primeng/tabview";
import { InputTextModule } from "primeng/inputtext";
import { CalendarModule } from "primeng/calendar";
import { FormsModule } from "@angular/forms";
import { DropdownModule } from "primeng/dropdown";
import { AutoCompleteModule } from "primeng/autocomplete";
import { ButtonModule } from "primeng/button";
import { ChipModule } from "primeng/chip";

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
        CardModule,
        TabViewModule,
        InputTextModule,
        CalendarModule,
        FormsModule,
        DropdownModule,
        AutoCompleteModule,
        ButtonModule,
        ChipModule
    ],
    declarations: [
        PageElectivesComponent
    ]
})
export class PageElectivesModule { }
