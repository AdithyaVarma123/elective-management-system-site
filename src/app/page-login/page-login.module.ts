import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PageLoginComponent } from './page-login.component';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {RadioButtonModule} from 'primeng/radiobutton';
import {FormsModule} from '@angular/forms';

const PageLoginRoutes: Routes = [
    {
        path: '',
        component: PageLoginComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        InputTextModule,
        ButtonModule,
        FormsModule,
        RadioButtonModule,
        RouterModule.forChild(PageLoginRoutes)
    ],
    declarations: [
        PageLoginComponent
    ]
})
export class PageLoginModule { }
