import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsService } from '../services/forms/forms.service';
import { IFormModel } from '../models/form-model';
import { IElectiveModel } from '../models/elective-model';
import { ToastService } from '../services/util/toast.service';
import { ConfirmationService } from 'primeng/api';
import { AuthService } from '../services/auth/auth.service';

@Component({
    selector: 'app-page-fill-form',
    templateUrl: './page-fill-form.component.html',
    styleUrls: ['./page-fill-form.component.scss'],
    providers: [ConfirmationService]
})
export class PageFillFormComponent implements OnInit {
    id: string;
    form: IFormModel = {
        electives: [],
        end: '',
        selectAllAtForm: false,
        shouldSelect: 0,
        start: ''
    };
    selectionOrder: IElectiveModel[] = [];
    sourceElectiveListCopy: IElectiveModel[] = [];
    isStudent = true;

    constructor(
        private activatedRoute: ActivatedRoute,
        private formsService: FormsService,
        private toastService: ToastService,
        private confirmationService: ConfirmationService,
        private authService: AuthService,
        private router: Router
    ) {
        this.isStudent = this.authService.getScope() === 'student';
        this.activatedRoute.paramMap.subscribe((paramMap) => {
            this.id = paramMap.get('id');
            this.formsService.getActiveForms().then((res) => {
                this.form = res[res.findIndex((e) => e.id === this.id)];
                // @ts-ignore
                this.form.start = new Date(this.form.start).toLocaleString();
                // @ts-ignore
                this.form.end = new Date(this.form.end).toLocaleString();
                this.sourceElectiveListCopy = [...this.form.electives];
            });
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    ngOnInit(): void {}

    submitForm() {
        if (!this.isStudent) {
            this.toastService.red('Only students can fill the form!');
            return;
        }
        if (!this.form.selectAllAtForm) {
            if (this.selectionOrder.length !== this.form.shouldSelect) {
                this.toastService.red(`Select at least ${this.form.shouldSelect} elective!`);
                return;
            }
        }
        if (this.form.selectAllAtForm) {
            if (this.selectionOrder.length !== this.form.electives.length) {
                this.toastService.red(`Select all the electives!`);
                return;
            }
        }
        this.confirmationService.confirm({
            message: 'Are you sure that you want to submit this priority list for electives?',
            accept: () => {
                this.formsService
                    .respondToForm(
                        this.id,
                        this.selectionOrder.map((e) => e.id)
                    )
                    .then(() => {
                        this.toastService.green('Form response recorded!');
                        this.router.navigate(['forms']).then().catch();
                    })
                    .catch(() => this.toastService.red('An unknown error occurred!'));
            }
        });
    }
}
