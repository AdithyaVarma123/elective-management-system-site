import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { User } from '../models/general';
import { ToastService } from '../services/util/toast.service';
import constants from '../constants';
import { DialogService } from 'primeng/dynamicdialog';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { NotificationService } from '../services/util/notification.service';

@Component({
    selector: 'app-page-profile',
    templateUrl: './page-profile.component.html',
    styleUrls: ['./page-profile.component.scss'],
    providers: [DialogService]
})
export class PageProfileComponent implements OnInit {
    subscribed = true;
    label = 'Subscribe';
    user: User = {
        name: '',
        id: '',
        username: '',
        rollNo: '',
        role: 'student',
        batch: undefined,
        electives: undefined
    };
    constructor(
        public dialogService: DialogService,
        private userService: UserService,
        private toast: ToastService,
        private notifservice: NotificationService
    ) {
        this.userService
            .getBasic()
            .then((res) => (this.user = res))
            .catch(() => {
                this.toast.red(constants.unknownError);
            });
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    async ngOnInit(): Promise<void> {
        await this.userService.getNotificationStatus().then((result) => {
            if (result) {
                this.label = 'Unsubscribe';
            }
            this.subscribed = result;
        });
    }

    subscription(): void {
        if (this.subscribed) {
            this.notifservice.unsubscribeToNotifications();
        } else {
            this.notifservice.subscribeToNotifications();
        }
    }

    changePass() {
        this.dialogService.open(ChangePasswordComponent, {
            header: 'Change password',
            width: '20%'
        });
    }
}
