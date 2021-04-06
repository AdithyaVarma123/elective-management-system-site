import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user/user.service';
import { ToastService } from '../../services/util/toast.service';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
    email;

    constructor(private user: UserService, private toast: ToastService) {}

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    ngOnInit() {}
    forgotPassword(): void {
        this.user
            .resetPassword(this.email)
            .then((result) => {
                if (result) this.toast.green('email sent for reset');
            })
            .catch((err) => {
                this.toast.red(err.name);
            });
    }
}
