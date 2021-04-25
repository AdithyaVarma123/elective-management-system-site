import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import constants from '../constants';
import { ToastService } from '../services/util/toast.service';
import { Record } from './record';
import { LazyLoadEvent } from 'primeng/api';
import { ElectivesService } from '../services/electives/electives.service';
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
    teachers = [''];
    attributes = [{ value: '', key: '' }];
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

    constructor(
        private userService: UserService,
        private toast: ToastService,
        private electiveService: ElectivesService
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
        // @ts-ignore
        this.getLogDetails({ first: 0 });
    }

    updateUser(): void {
        if (!/^\d{4}-\d-[a-zA-Z]{4,5}-[a-zA-Z]{3,4}$/.test(this.updateBatch)) {
            this.toast.red('invalid batch code');
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
                if (res) this.toast.green('elective added');
            })
            .catch(() => {
                this.toast.red(constants.unknownError);
            });
    }

    addElective(): void {
        for (const v of this.batches) {
            if (!/^\d{4}-\d-[a-zA-Z]{4,5}-[a-zA-Z]{3,4}$/.test(v)) {
                this.toast.red('invalid batch code');
                return;
            }
        }
        const body = {
            name: this.eName,
            description: this.desc,
            courseCode: this.courseCode,
            version: '' + this.version,
            strength: '' + this.strength,
            attributes: this.attributes,
            batches: this.batches,
            teachers: this.teachers
        };
        this.electiveService
            .addElective(body)
            .then((res) => {
                if (res) this.toast.green('elective added');
            })
            .catch(() => {
                this.toast.red(constants.unknownError);
            });
    }

    getLogDetails(event: LazyLoadEvent): void {
        this.loading = true;
        this.page = event.first === 0 ? 0 : event.first / 25;
        this.userService.getlogDetails(this.page, 'time').then((data) => {
            this.records = [...data.docs];
            this.totalRecords = data.count;
            this.loading = false;
        });
    }

    addUser(): void {
        let body;
        if (this.userRole === 'student')
            if (!/^\d{4}-\d-[a-zA-Z]{4,5}-[a-zA-Z]{3,4}$/.test(this.batch)) {
                this.toast.red('invalid batch code');
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
                if (res) this.toast.green('User added');
            })
            .catch(() => {
                this.toast.red(constants.unknownError);
            });
    }

    uploadCSV(evt: any): void {
        this.userService
            .uploadcsv(evt[0], true)
            .then((res) => {
                if (res) this.toast.green('User added');
            })
            .catch(() => {
                this.toast.red(constants.unknownError);
            });
    }

    uploadCSVforElective(evt: any): void {
        this.electiveService
            .addElectivesCSV(evt[0], true)
            .then((res) => {
                if (res) this.toast.green('Electives added');
            })
            .catch(() => {
                this.toast.red(constants.unknownError);
            });
    }

    deleteUser(): void {
        this.userService
            .deleteUser(this.delRol)
            .then((res) => {
                if (res) this.toast.green('User deleted');
            })
            .catch(() => {
                this.toast.red(constants.unknownError);
            });
    }
    addBatch() {
        this.batches.push('');
    }
    addTeacher() {
        this.teachers.push('');
    }
    addAttribute() {
        this.attributes.push({ value: '', key: '' });
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    trackByIdx(index: number, obj: any): any {
        return index;
    }
}
