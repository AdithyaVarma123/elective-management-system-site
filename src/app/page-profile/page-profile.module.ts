import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PageProfileComponent } from './page-profile.component';
import {AvatarModule} from 'primeng/avatar';
import {ButtonModule} from 'primeng/button';

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
        RouterModule.forChild(PageProfileRoutes)
    ],
    declarations: [
        PageProfileComponent
    ]
})
export class PageProfileModule { }
