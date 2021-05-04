import { Component, OnInit } from '@angular/core';
import { ClassesService } from '../services/classes/classes.service';
import { IClassModel } from '../models/class-model';
import { ActivatedRoute } from '@angular/router';
import { IDownloadModel } from '../models/download-model';
import { AuthService } from '../services/auth/auth.service';
import { ToastService } from '../services/util/toast.service';
import { IUserModel } from '../models/user-model';
import constants from '../constants';
import { ConfirmationService } from 'primeng/api';

@Component({
    selector: 'app-page-class',
    templateUrl: './page-class.component.html',
    styleUrls: ['./page-class.component.scss'],
    providers: [ConfirmationService]
})
export class PageClassComponent implements OnInit {
    class: IClassModel = {
        batches: [],
        elective: {
            attributes: [],
            batches: undefined,
            courseCode: '',
            description: '',
            name: '',
            strength: 0,
            teachers: undefined,
            version: 0
        },
        students: [],
        teacher: { name: '', password: '', role: undefined, rollNo: '', username: '' },
        files: []
    };

    items: {
        file: IDownloadModel;
        createdAt: string;
    }[] = [];

    isStudent = true;

    trackAccessDialog = false;
    tracked: {
        user: IUserModel;
        time: string;
    }[] = [];

    constructor(
        private classService: ClassesService,
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private toastService: ToastService,
        private confirmationService: ConfirmationService
    ) {
        this.isStudent = this.authService.getScope() === 'student';
    }

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe((paramMap) => {
            const id = paramMap.get('id');
            this.classService.getClasses(0).then((res) => {
                this.class = res.docs[res.docs.findIndex((e) => e.id === id)];
                this.items = [
                    ...this.class.files.map((e) => ({ ...e, createdAt: new Date(e.createdAt).toLocaleString() }))
                ];
            });
        });
    }

    downloadFile(item: IDownloadModel) {
        this.classService
            .getResource(item.fileId, item.name)
            .then(() => this.toastService.green('Downloaded successfully!'))
            .catch((err) => this.toastService.red(`An error occurred: ${err?.message}`));
    }

    viewTracked(item: IDownloadModel) {
        this.classService.getTracked(item.fileId).then((res) => {
            this.tracked = [...res.trackAccess.map((e) => ({ ...e, time: new Date(e.time).toLocaleString() }))];
            this.trackAccessDialog = true;
        });
    }

    async uploadResource(evt: any) {
        let accept: boolean;
        await new Promise<void>((resolve) => {
            this.confirmationService.confirm({
                message: 'Do you want to track the downloads for this resource?',
                accept: () => {
                    accept = true;
                    resolve();
                },
                reject: () => {
                    accept = false;
                    resolve();
                }
            });
        });
        this.classService
            .addResource(evt[0], this.class.id, accept)
            .then(() => {
                this.toastService.green('Item added');
                this.ngOnInit();
            })
            .catch(() => this.toastService.red(constants.unknownError));
    }

    deleteResource(item: IDownloadModel) {
        this.confirmationService.confirm({
            message: `Are you sure you want to delete ${item.name} ?`,
            accept: () => {
                this.classService
                    .deleteResource(item.fileId)
                    .then(() => {
                        this.ngOnInit();
                        this.toastService.green('Deleted successfully!');
                    })
                    .catch((err) => this.toastService.red(`An unknown error occurred: ${err?.message}`));
            }
        });
    }
}
