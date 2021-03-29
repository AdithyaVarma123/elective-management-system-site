import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth/auth.service';
import {scopes} from '../models/general';
import {ToastService} from '../services/util/toast.service';
import {Router} from '@angular/router';
import {DialogService} from "primeng/dynamicdialog";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {ChangePasswordComponent} from "../page-profile/change-password/change-password.component";

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.scss'],
    providers: [DialogService]
})
export class PageLoginComponent implements OnInit {



    role: scopes = 'student';
    username = '';
    password = '';

    constructor(
        private auth: AuthService,
        private toast: ToastService,
        private router: Router,
        private dialogService: DialogService
    ) {}

    ngOnInit(): void {
        setTimeout(() => {
            if (this.auth.isLoggedIn()) {
                this.router.navigate(['profile']).then().catch();
            }
        }, 500);
    }

    popup(): void{
        this.dialogService.open(ForgotPasswordComponent, {
            header: 'Change password',
            width: '20%'
        });
    }

    login(): void {
        this.auth.login(this.username, this.password, this.role).then(status => {
            if (status) {
                this.router.navigate(['profile']).then(() => window.location.reload()).catch();
            }
        }).catch(err => {
            this.toast.red(err.error, 3000, false, err?.error_description);
        });
    }
}
