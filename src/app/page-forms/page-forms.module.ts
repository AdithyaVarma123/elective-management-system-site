import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PageFormsComponent } from './page-forms.component';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PickListModule } from 'primeng/picklist';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MultiSelectModule } from 'primeng/multiselect';
import { CheckboxModule } from 'primeng/checkbox';

const PageElectivesRoutes: Routes = [
    {
        path: '',
        component: PageFormsComponent
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
        ChipModule,
        TableModule,
        DialogModule,
        ConfirmDialogModule,
        PickListModule,
        ProgressSpinnerModule,
        MultiSelectModule,
        CheckboxModule
    ],
    declarations: [PageFormsComponent]
})
export class PageFormsModule {}
