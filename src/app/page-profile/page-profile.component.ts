import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user/user.service';
import {User} from '../models/general';
import {ToastService} from '../services/util/toast.service';
import constants from '../constants';
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {ChangePasswordComponent} from "./change-password/change-password.component";

@Component({
    selector: 'app-page-profile',
    templateUrl: './page-profile.component.html',
    styleUrls: ['./page-profile.component.scss'],
    providers: [DialogService]
})
export class PageProfileComponent implements OnInit {
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
        private toast: ToastService
    ) {
        this.userService.getBasic().then(res => this.user = res).catch(err => {
            this.toast.red(constants.unknownError);
        });
    }

    ngOnInit(): void { }

    changePass() {
        this.dialogService.open(ChangePasswordComponent, {
            header: 'Change password',
            width: '20%'
        });




    }

}
