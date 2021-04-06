import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { ToastService } from '../services/util/toast.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-page-reset-password',
    templateUrl: './page-reset-password.component.html',
    styleUrls: ['./page-reset-password.component.scss']
})
export class PageResetPasswordComponent implements OnInit {
    newpass;
    confirmpass;
    code;

    // try and always use correct naming convention. The above variables should be renamed to camelCase. Don't go about manually renaming.
    // Right click and use refactor, the IDE will automatically edit all instances of that variable.

    constructor(
        private user: UserService,
        private toast: ToastService,
        private router: Router,
        private _activatedRoute: ActivatedRoute
    ) {}

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    ngOnInit() {}

    reset(): void {
        if (this.newpass === this.confirmpass) {
            this._activatedRoute.queryParamMap.subscribe((parameter) => {
                this.code = parameter.get('code');
                this.user
                    .resetpass(this.newpass, this.code)
                    .then((result) => {
                        if (result) this.toast.green('email sent for reset');
                    })
                    .catch((err) => {
                        this.toast.red(err.name, 3000, false, err?.description);
                    });
            });
        } else {
            this.toast.red('new password and confirm password do not match');
        }
    }
}
