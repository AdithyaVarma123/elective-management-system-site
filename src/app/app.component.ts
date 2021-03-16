import {Component, OnInit} from '@angular/core';
import {MenuItem, PrimeNGConfig} from 'primeng/api';
import {AuthService} from './services/auth/auth.service';
import {ToastService} from './services/util/toast.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    title = 'elective-management-system-site';
    items: MenuItem[];

    constructor(
        private primengConfig: PrimeNGConfig,
        public auth: AuthService,
        private toastService: ToastService,
    ) {
        this.auth.attemptAutoAuth().then(status => {
            if (status) {
                this.items = [
                    {
                        label: 'Profile',
                        icon: 'pi pi-user',
                        routerLink: ['profile']
                    },
                    {
                        label: 'Electives',
                        icon: 'pi pi-th-large'
                    },
                    {
                        label: 'Classes',
                        icon: 'pi pi-book'
                    },
                    {
                        label: 'Administration',
                        icon: 'pi pi-cog',
                        routerLink: ['administration'],
                        visible: this.auth.getScope() === 'admin'
                    }
                ];
            }
        }).catch();
    }

    ngOnInit(): void {
        this.primengConfig.ripple = true;
    }

    logout(): void {
        this.auth.logout()
        .then(() => {
            this.toastService.green('Logged out successfully!');
        })
        .catch(err => {
            this.toastService.red('An error occurred while logging out!');
        });
    }
}
