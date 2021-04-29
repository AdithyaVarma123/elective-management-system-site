import { Component, OnInit } from '@angular/core';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { AuthService } from './services/auth/auth.service';
import { ToastService } from './services/util/toast.service';
import { NotificationService } from './services/util/notification.service';
import { SwUpdate } from '@angular/service-worker';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'elective-management-system-site';
    items: MenuItem[];

    constructor(
        private swUpdate: SwUpdate,
        private primengConfig: PrimeNGConfig,
        public auth: AuthService,
        private toastService: ToastService,
        private notificationService: NotificationService
    ) {
        this.auth
            .attemptAutoAuth()
            .then((status) => {
                if (status) {
                    this.notificationService.subscribeToNotifications();
                    this.items = [
                        {
                            label: 'Profile',
                            icon: 'pi pi-user',
                            routerLink: ['profile']
                        },
                        {
                            label: 'Electives',
                            icon: 'pi pi-file',
                            routerLink: ['electives']
                        },
                        {
                            label: 'Forms',
                            icon: 'pi pi-th-large',
                            routerLink: ['forms']
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
            })
            .catch();
    }

    ngOnInit(): void {
        this.primengConfig.ripple = true;
        if (this.swUpdate.isEnabled) {
            this.swUpdate.available.subscribe(() => {
                this.swUpdate.activateUpdate().then(() => {
                    window.location.reload();
                });
            });
        }
    }

    logout(): void {
        this.auth
            .logout()
            .then(() => {
                this.toastService.green('Logged out successfully!');
            })
            .catch(() => {
                this.toastService.red('An error occurred while logging out!');
            });
    }
}
