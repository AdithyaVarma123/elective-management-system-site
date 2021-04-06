import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PageResetPasswordComponent } from './page-reset-password.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const PageResetPasswordRoutes: Routes = [
    {
        path: '',
        component: PageResetPasswordComponent
    }
];

@NgModule({
    imports: [
        HttpClientModule,
        CommonModule,
        InputTextModule,
        ButtonModule,
        RouterModule.forChild(PageResetPasswordRoutes),
        FormsModule
    ],
    declarations: [PageResetPasswordComponent]
})
export class PageResetPasswordModule {}
