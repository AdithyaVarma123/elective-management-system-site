import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../../services/util/toast.service';
import { UserService } from '../../services/user/user.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
    oldpass;
    newpass;
    success = false;

    constructor(
        private http: HttpClient,
        private toast: ToastService,
        private service: UserService,
        private ref: DynamicDialogRef
    ) {}

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    ngOnInit(): void {}

    changePass() {
        this.service
            .changePassword(this.oldpass, this.newpass)
            .then((result) => {
                if (result) this.toast.green('password updated');
                this.ref.close();
            })
            .catch((err) => {
                this.toast.red(err.name);
                this.ref.close();
            });
    }
}
