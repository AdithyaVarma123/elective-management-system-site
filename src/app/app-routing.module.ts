import { NgModule } from '@angular/core';
import {NoPreloading, PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './services/auth/auth.guard';
const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'login',
        loadChildren: () => import('./page-login/page-login.module').then( m => m.PageLoginModule)
    },
    {
        path: 'profile',
        canActivate: [AuthGuard],
        loadChildren: () => import('./page-profile/page-profile.module').then(m => m.PageProfileModule)
    }
];
@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: NoPreloading })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
