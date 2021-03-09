import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PageProfileComponent } from './page-profile.component';
import {AvatarModule} from 'primeng/avatar';
import {ButtonModule} from 'primeng/button';
import {DynamicDialogModule} from "primeng/dynamicdialog";
import { ChangePasswordComponent } from './change-password/change-password.component';
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";

const PageProfileRoutes: Routes = [
    {
        path: '',
        component: PageProfileComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        AvatarModule,
        ButtonModule,
        RouterModule.forChild(PageProfileRoutes),
        DynamicDialogModule,
        InputTextModule,
        FormsModule,
    ],
    declarations: [
        PageProfileComponent,
        ChangePasswordComponent
    ]
})
export class PageProfileModule { }
