import { NgModule } from '@angular/core';
import { NoPreloading, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth/auth.guard';
const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadChildren: () => import('./page-login/page-login.module').then((m) => m.PageLoginModule)
    },
    {
        path: 'profile',
        canActivate: [AuthGuard],
        loadChildren: () => import('./page-profile/page-profile.module').then((m) => m.PageProfileModule)
    },
    {
        path: 'administration',
        canActivate: [AuthGuard],
        loadChildren: () =>
            import('./page-administration/page-administration.module').then((m) => m.PageAdministrationModule)
    },
    {
        path: 'resetPassword',
        loadChildren: () =>
            import('./page-reset-password/page-reset-password.module').then((m) => m.PageResetPasswordModule)
    },
    {
        path: 'electives',
        canActivate: [AuthGuard],
        loadChildren: () => import('./page-electives/page-electives.module').then(m => m.PageElectivesModule)
    }
];
@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: NoPreloading })],
    exports: [RouterModule]
})
export class AppRoutingModule {}
