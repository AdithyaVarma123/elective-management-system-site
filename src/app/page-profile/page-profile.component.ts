import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { ToastService } from '../services/util/toast.service';
import constants from '../constants';
import { DialogService } from 'primeng/dynamicdialog';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { NotificationService } from '../services/util/notification.service';
import { IUserModel } from "../models/user-model";

@Component({
    selector: 'app-page-profile',
    templateUrl: './page-profile.component.html',
    styleUrls: ['./page-profile.component.scss'],
    providers: [DialogService]
})
export class PageProfileComponent implements OnInit {
    subscribed = true;
    label = 'Subscribe';
    user: IUserModel = {
        classes: [], password: "",
        name: '',
        id: '',
        username: '',
        rollNo: '',
        role: 'student',
        batch: undefined
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
    ngOnInit(){
        this.notifyButton();
    }

    subscription(): void {
        if (this.subscribed) {
            this.notifservice.unsubscribeToNotifications()
        } else {
            this.notifservice.subscribeToNotifications();
        }
        setTimeout(() => {
            this.label = 'Unsubscribe';
            this.notifyButton();
        }, 1500);
    }

    changePass() {
        this.dialogService.open(ChangePasswordComponent, {
            header: 'Change password',
            width: '20%'
        });
    }

    notifyButton() {
        this.userService.getNotificationStatus().then((result) => {
            if (result) {
                this.label = 'Unsubscribe';
            }
            this.subscribed = result;
        });
    }
}
