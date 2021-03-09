import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth/auth.service';
import {scopes} from '../models/general';
import {ToastService} from '../services/util/toast.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.scss']
})
export class PageLoginComponent implements OnInit {

    role: scopes = 'student';
    username = '';
    password = '';

    constructor(
        private auth: AuthService,
        private toast: ToastService,
        private router: Router
    ) {}

    ngOnInit(): void {
        setTimeout(() => {
            if (this.auth.isLoggedIn()) {
                this.router.navigate(['profile']).then().catch();
            }
        }, 500);
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
