import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user/user.service';
import {User} from '../models/general';
import {ToastService} from '../services/util/toast.service';
import constants from '../constants';

@Component({
    selector: 'app-page-profile',
    templateUrl: './page-profile.component.html',
    styleUrls: ['./page-profile.component.scss']
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
        private userService: UserService,
        private toast: ToastService
    ) {
        this.userService.getBasic().then(res => this.user = res).catch(err => {
            this.toast.red(constants.unknownError);
        });
    }

    ngOnInit(): void { }

}
