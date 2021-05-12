import { Component, OnInit } from '@angular/core';
import { ClassesService } from '../services/classes/classes.service';
import { IClassModel } from '../models/class-model';
import { AuthService } from '../services/auth/auth.service';
import { IUserModel } from '../models/user-model';
import { IElectiveModel } from '../models/elective-model';
import { ConfirmationService } from 'primeng/api';
import { ToastService } from '../services/util/toast.service';
import { IRequestChangeModel } from '../models/request-change-model';

@Component({
    selector: 'app-page-classes',
    templateUrl: './page-classes.component.html',
    styleUrls: ['./page-classes.component.scss'],
    providers: [ConfirmationService]
})
export class PageClassesComponent implements OnInit {
    classes: IClassModel[] = [];
    isStudent = true;
    isTeacher = false;
    isAdmin = false;

    loading = false;
    page = 0;
    totalRecords = 0;

    studentsDialog = false;
    students: IUserModel[] = [];

    electiveChangeDialog = false;
    canRequestElectiveChange = false;
    requestElectives: IElectiveModel[] = [];
    fromRequest = '';
    toRequest = '';

    electiveChangeRequests: IRequestChangeModel[] = [];

    constructor(
        private classesService: ClassesService,
        private authService: AuthService,
        private confirmationService: ConfirmationService,
        private toastService: ToastService
    ) {
        this.isStudent = authService.getScope() === 'student';
        this.isTeacher = authService.getScope() === 'teacher';
        this.isAdmin = authService.getScope() === 'admin';
    }

    ngOnInit(): void {
        if (this.isStudent || this.isTeacher) {
            this.classesService.getActiveClasses().then((classes) => (this.classes = classes));
            if (this.isStudent) {
                this.classesService
                    .canRequestElectiveChange()
                    .then((res) => (this.canRequestElectiveChange = !res))
                    .catch(() => (this.canRequestElectiveChange = false));
            }
        } else {
            this.setPage({ first: 0 });
            this.classesService.getElectiveChangeRequests().then((res) => (this.electiveChangeRequests = res));
        }
    }

    setPage(event) {
        this.loading = true;
        this.page = event.first === 0 ? 0 : event.first / 25;
        this.classesService.getClasses(this.page).then((res) => {
            this.classes = [...res.docs];
            this.loading = false;
            this.totalRecords = res.count;
        });
    }

    viewStudents(classes: IClassModel) {
        this.classesService.getStudents(classes.id).then((res) => {
            this.students = res;
            this.studentsDialog = true;
        });
    }

    requestElectiveChange() {
        this.electiveChangeDialog = true;
        this.classesService.getValidRequestElectives().then((res) => {
            this.requestElectives = res;
            this.fromRequest = this.classes[0].elective.id;
            this.toRequest = this.requestElectives[0].id;
        });
    }

    requestChange() {
        if (this.fromRequest === this.toRequest) {
            this.toastService.red('Cannot change to the same elective!');
        } else if (this.classes.findIndex((e) => e.elective.id === this.toRequest) > -1) {
            this.toastService.red('Cannot change to a class you are already part of!');
        } else {
            this.confirmationService.confirm({
                message: `Are you sure you want to request a change in electives?`,
                accept: () => {
                    this.electiveChangeDialog = false;
                    this.classesService
                        .requestElectiveChange(this.fromRequest, this.toRequest)
                        .then(() => {
                            this.toastService.green('Request added successfully!');
                            this.ngOnInit();
                        })
                        .catch((err) => this.toastService.red(`An unknown error occurred: ${err?.error?.message}`));
                }
            });
        }
    }

    confirmChange(item: IRequestChangeModel) {
        this.confirmationService.confirm({
            message: `Are you sure you want to approve elective change for ${item.user.rollNo} from ${item.from.name} to ${item.to.name} ?`,
            accept: () => {
                this.classesService
                    .confirmChangeRequest(item.id)
                    .then(() => {
                        this.toastService.green('Confirmed successfully!');
                        this.ngOnInit();
                    })
                    .catch((err) => this.toastService.red(`An unknown error occurred: ${err?.error?.message}`));
            }
        });
    }

    removeChangeRequest(item: IRequestChangeModel) {
        this.confirmationService.confirm({
            message: `Are you sure you want to remove elective change request by ${item.user.rollNo} ?`,
            accept: () => {
                this.classesService
                    .removeChangeRequest(item.id)
                    .then(() => {
                        this.toastService.green('Removed successfully!');
                        this.ngOnInit();
                    })
                    .catch((err) => this.toastService.red(`An unknown error occurred: ${err?.error?.message}`));
            }
        });
    }
}
