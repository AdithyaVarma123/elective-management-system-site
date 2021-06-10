import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import constants from '../constants';
import { ToastService } from '../services/util/toast.service';
import { ElectivesService } from '../services/electives/electives.service';
import { IElectiveModel } from '../models/elective-model';
import { ConfirmationService } from 'primeng/api';

@Component({
    selector: 'app-page-electives',
    templateUrl: './page-electives.component.html',
    styleUrls: ['./page-electives.component.scss'],
    providers: [ConfirmationService]
})
export class PageElectivesComponent implements OnInit {
    isStudent = true;
    isTeacher = false;

    batches = [''];
    teachers = [''];
    attributes = [{ value: '', key: '' }];
    eName = '';
    courseCode = '';
    desc = '';
    version;
    strength;

    electives: IElectiveModel[] = [];
    totalRecords = 0;
    loading = false;
    page = 0;

    editDialog = false;
    selectedElective: IElectiveModel = {
        id: '',
        attributes: [],
        batches: [],
        courseCode: '',
        description: '',
        name: '',
        strength: 0,
        teachers: [],
        version: 0
    };

    constructor(
        private authService: AuthService,
        private toastService: ToastService,
        private electiveService: ElectivesService,
        private confirmationService: ConfirmationService
    ) {
        this.isStudent = this.authService.getScope() === 'student';
        this.isTeacher = this.authService.getScope() === 'teacher';
    }

    ngOnInit(): void {
        this.setPageElectives({ first: 0 });
    }

    addAttribute(item?: number) {
        if (item) {
            this.selectedElective.attributes.push({ value: '', key: '' });
        } else {
            this.attributes.push({ value: '', key: '' });
        }
    }

    addBatch(item?: number) {
        if (item) {
            // @ts-ignore
            this.selectedElective.batches.push('');
        } else {
            this.batches.push('');
        }
    }

    addTeacher(item?: number) {
        if (item) {
            // @ts-ignore
            this.selectedElective.teachers.push('');
        } else {
            this.teachers.push('');
        }
    }

    removeBatch(i: number, item?: number) {
        if (item) {
            this.selectedElective.batches.splice(i, 1);
        } else {
            this.batches.splice(i, 1);
        }
    }

    removeTeacher(i: number, item?: number) {
        if (item) {
            this.selectedElective.teachers.splice(i, 1);
        } else {
            this.teachers.splice(i, 1);
        }
    }

    removeAttribute(i: number, item?: number) {
        if (item) {
            this.selectedElective.attributes.splice(i, 1);
        } else {
            this.attributes.splice(i, 1);
        }
    }

    uploadCSVForElective(evt: any): void {
        this.electiveService
            .addElectivesCSV(evt[0], true)
            .then((res) => {
                if (res) this.toastService.green('Electives added');
            })
            .catch(() => {
                this.toastService.red(constants.unknownError);
            });
    }

    addElective(): void {
        for (const v of this.batches) {
            if (!/^\d{4}-\d-[a-zA-Z]{4,5}-[a-zA-Z]{3,4}$/.test(v)) {
                this.toastService.red('invalid batch code');
                throw 'bad batch';
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
                if (res) {
                    this.toastService.green('elective added');
                    this.batches = [''];
                    this.teachers = [''];
                    this.attributes = [{ value: '', key: '' }];
                    this.eName = '';
                    this.courseCode = '';
                    this.desc = '';
                    this.version = undefined;
                    this.strength = undefined;
                    this.setPageElectives({ first: 0 });
                }
                else{
                    this.toastService.red(constants.unknownError);
                }
            })
            .catch(() => {
                this.toastService.red(constants.unknownError);
            });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    trackByIdx(index: number, obj: any): any {
        return index;
    }

    setPageElectives(event) {
        this.loading = true;
        this.page = event.first === 0 ? 0 : event.first / 25;
        this.electiveService.search(this.page).then((res) => {
            this.electives = [...res.docs];
            this.loading = false;
            this.totalRecords = res.count;
        });
    }

    editElective(elective: IElectiveModel) {
        this.editDialog = true;
        this.selectedElective = {
            ...elective,
            // @ts-ignore
            batches: elective.batches.map((e) => e.batchString),
            // @ts-ignore
            teachers: elective.teachers.map((e) => e.rollNo)
        };
    }

    deleteElective(elective: IElectiveModel) {
        this.confirmationService.confirm({
            message: `Are you sure you want to delete this elective ${elective.name}?`,
            accept: () => {
                this.electiveService
                    .deleteElective(elective.id)
                    .then(() => {
                        this.toastService.green('Elective deleted successfully');
                        this.ngOnInit();
                    })
                    .catch(() => {
                        this.toastService.red('An unknown error occurred!');
                    });
            }
        });
    }

    updateElective() {
        this.electiveService
            .updateElectives(this.selectedElective)
            .then((res) => {
                if (res.status) {
                    this.toastService.green('Elective updated successfully');
                    this.setPageElectives({ first: 0 });
                    this.editDialog = false;
                } else {
                    this.toastService.red(res.message);
                }
            })
            .catch((err) => {
                this.toastService.red(err.message);
            });
    }
}
