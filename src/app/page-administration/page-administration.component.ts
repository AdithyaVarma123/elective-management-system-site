import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import constants from '../constants';
import { ToastService } from '../services/util/toast.service';
import { Record } from './record';
import { LazyLoadEvent } from 'primeng/api';
import { NotificationService } from '../services/util/notification.service';

@Component({
    selector: 'app-page-administration',
    templateUrl: './page-administration.component.html',
    styleUrls: ['./page-administration.component.scss']
})
export class PageAdministrationComponent implements OnInit {
    records: Record[];
    loading = false;
    cols: any[];
    eName = '';
    password = '';
    courseCode = '';
    desc = '';
    version;
    strength;
    batches = [''];
    uname = '';
    rollNo = '';
    username = '';
    userRole = 'student';
    batch = '';
    delRol = '';
    updateName = '';
    updatePassword = '';
    updateRollNo = '';
    updateBatch = '';
    page = 0;
    totalRecords = 0;
    roleOptions = [
        {
            name: 'student',
            value: 'student'
        },
        {
            name: 'teacher',
            value: 'teacher'
        },
        {
            name: 'admin',
            value: 'admin'
        }
    ];

    notifyMode: { name: string; value: string }[] = [
        {
            name: 'Users',
            value: 'user'
        },
        {
            name: 'Batches',
            value: 'batch'
        },
        {
            name: 'Notify by role',
            value: 'role'
        },
        {
            name: 'Notify all users',
            value: 'all'
        }
    ];
    notifyType: 'user' | 'batch' | 'role' | 'all' = 'user';

    notifyItem = '';
    items: string[] = [];

    notifyRoles: { name: string; value: string }[] = [
        {
            name: 'Administrators',
            value: 'admin'
        },
        {
            name: 'Students',
            value: 'student'
        },
        {
            name: 'Teachers',
            value: 'teacher'
        }
    ];
    notifyRole = 'student';

    notifyTitle = '';
    notifyBody = '';
    replaceMode = false;
    replaceModeOptions: { name: string; value: boolean }[] = [
        {
            name: 'Yes',
            value: true
        },
        {
            name: 'No',
            value: false
        }
    ];

    constructor(
        private userService: UserService,
        private toastService: ToastService,
        private notificationService: NotificationService
    ) {}

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    ngOnInit() {
        this.cols = [
            { field: 'browser', header: 'Browser' },
            { field: 'createdAt', header: 'Created at' },
            { field: 'device', header: 'Device' },
            { field: 'ip', header: 'IP address' },
            { field: 'platform', header: 'Platform' },
            { field: 'rollNo', header: 'Roll Number' }
        ];
        this.notifyType = 'user';
        // @ts-ignore
        this.getLogDetails({ first: 0 });
    }

    updateUser(): void {
        if (!/^\d{4}-\d-[a-zA-Z]{4,5}-[a-zA-Z]{3,4}$/.test(this.updateBatch)) {
            this.toastService.red('invalid batch code');
            return;
        }
        const body = [
            {
                name: this.updateName,
                password: this.updatePassword,
                rollNo: this.updateRollNo,
                batch: this.updateBatch
            }
        ];
        this.userService
            .updateUser(body)
            .then((res) => {
                if (res) this.toastService.green('User updated');
            })
            .catch(() => {
                this.toastService.red(constants.unknownError);
            });
    }

    getLogDetails(event: LazyLoadEvent): void {
        this.loading = true;
        this.page = event.first === 0 ? 0 : event.first / 25;
        this.userService.getlogDetails(this.page, 'createdAt').then((data) => {
            this.records = [...data.docs];
            this.totalRecords = data.count;
            this.loading = false;
        });
    }

    addUser(): void {
        let body;
        if (this.userRole === 'student')
            if (!/^\d{4}-\d-[a-zA-Z]{4,5}-[a-zA-Z]{3,4}$/.test(this.batch)) {
                this.toastService.red('invalid batch code');
                return;
            }
        if (this.userRole == 'student') {
            body = {
                users: {
                    name: this.uname,
                    username: this.username,
                    rollNo: this.rollNo,
                    role: this.userRole,
                    batch: this.batch
                },
                defaultRollNoAsEmail: true
            };
        } else {
            body = {
                users: {
                    name: this.uname,
                    username: this.username,
                    rollNo: this.rollNo,
                    role: this.userRole
                },
                defaultRollNoAsEmail: true
            };
        }
        this.userService
            .addUser(body)
            .then((res) => {
                if (res) this.toastService.green('User added');
            })
            .catch(() => {
                this.toastService.red(constants.unknownError);
            });
    }

    uploadCSV(evt: any): void {
        this.userService
            .uploadcsv(evt[0], true)
            .then((res) => {
                if (res) this.toastService.green('User added');
            })
            .catch(() => {
                this.toastService.red(constants.unknownError);
            });
    }

    deleteUser(): void {
        this.userService
            .deleteUser(this.delRol)
            .then((res) => {
                if (res) this.toastService.green('User deleted');
            })
            .catch(() => {
                this.toastService.red(constants.unknownError);
            });
    }

    updateItem(type: 'user' | 'batch') {
        if (type === 'user') {
            if (this.notifyItem.length > 0) {
                this.items.push(this.notifyItem);
                this.notifyItem = '';
            }
        } else {
            if (this.notifyItem.length > 0 && /^\d{4}-\d-[a-zA-Z]{4,5}-[a-zA-Z]{3,4}$/.test(this.notifyItem)) {
                this.items.push(this.notifyItem);
                this.notifyItem = '';
            }
        }
    }

    reset() {
        this.notifyItem = '';
        this.items = [];
    }

    customNotify() {
        if (this.notifyType === 'user' || this.notifyType === 'batch') {
            if (this.items.length === 0) {
                this.toastService.red(`Add at least one ${this.notifyType}`);
                return;
            }
        }
        if (this.notifyTitle.length === 0) {
            this.toastService.red('Enter a title!');
            return;
        }
        if (this.notifyBody.length === 0) {
            this.toastService.red('Enter a body!');
            return;
        }
        this.notificationService
            .sendCustomNotification({
                users: this.notifyType === 'user' ? this.items : [],
                batches: this.notifyType === 'batch' ? this.items : [],
                // @ts-ignore
                role: this.notifyType === 'role' ? this.notifyRole : undefined,
                notifyAll: this.notifyType === 'all',
                title: this.notifyTitle,
                body: this.notifyBody,
                replaceItems: this.replaceMode
            })
            .then((res) => {
                if (res) {
                    this.toastService.green('Notifications sent out successfully!');
                    this.notifyTitle = '';
                    this.notifyType = 'user';
                    this.notifyRole = 'student';
                    this.notifyBody = '';
                    this.items = [];
                    this.notifyItem = '';
                    this.replaceMode = false;
                } else {
                    this.toastService.red(`An unknown error occurred!`);
                }
            })
            .catch((err) => this.toastService.red(`An unknown error occurred: ${err?.message}`));
    }
}
