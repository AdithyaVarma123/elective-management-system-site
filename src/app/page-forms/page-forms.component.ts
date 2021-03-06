import { Component, OnInit } from '@angular/core';
import { FormsService } from '../services/forms/forms.service';
import { AuthService } from '../services/auth/auth.service';
import { ElectivesService } from '../services/electives/electives.service';
import { IElectiveModel } from '../models/elective-model';
import { ToastService } from '../services/util/toast.service';
import { Router } from '@angular/router';
import { IFormModel } from '../models/form-model';
import { ConfirmationService } from 'primeng/api';
import { IResponseModel } from '../models/response-model';
import { rawListType, vacancyType } from '../models/general';

interface item {
    name: string;
    value: boolean;
}

@Component({
    selector: 'app-page-electives',
    templateUrl: './page-forms.component.html',
    styleUrls: ['./page-forms.component.scss'],
    providers: [ConfirmationService]
})
export class PageFormsComponent implements OnInit {
    start = new Date();
    end;
    numElectives;
    shouldSelectAll;
    selectedElective;
    searchBy = 'Name';
    suggestedElectives: IElectiveModel[] = [];
    selectedElectives: IElectiveModel[] = [];
    activeForms: IFormModel[] = [];
    forms: IFormModel[] = [];
    page = 0;
    totalRecords = 0;
    loading = false;
    editDialog = false;
    currentForm: IFormModel = {
        id: '',
        explicit: [],
        active: false,
        electives: [],
        end: undefined,
        selectAllAtForm: false,
        shouldSelect: 0,
        start: undefined
    };
    option: item[];
    selectAllAtForm: item;
    isAdmin = false;

    responsesDialog = false;
    responses: IResponseModel[] = [];

    explicitDialog = false;
    rawList: rawListType = [];
    explicitCheckbox: boolean[] = [];
    loadingExplicit = false;
    electiveOptions: IElectiveModel[] = [];

    vacancyDialog = false;
    vacancy: vacancyType = [];
    loadingVacancy = false;

    constructor(
        private formService: FormsService,
        public authService: AuthService,
        private electivesService: ElectivesService,
        private toastService: ToastService,
        private router: Router,
        private confirmationService: ConfirmationService
    ) {
        this.option = [
            { name: 'Yes', value: true },
            { name: 'No', value: false }
        ];
        this.shouldSelectAll = this.option[0];
        this.isAdmin = this.authService.getScope() === 'admin';
    }

    resetForm() {
        this.start = new Date();
        this.end = undefined;
        this.numElectives = undefined;
        this.shouldSelectAll = 'Yes';
        this.selectedElective = undefined;
        this.searchBy = 'Name';
        this.suggestedElectives = [];
        this.selectedElectives = [];
    }

    ngOnInit() {
        this.formService.getActiveForms().then((res) => {
            this.activeForms = res.map((e) => ({
                ...e,
                end: new Date(e.end).toLocaleString(),
                start: new Date(e.start).toLocaleString()
            }));
        });
        this.resetForm();
        if (this.authService.getScope() !== 'student') {
            this.setPageForms({ first: 0 });
        }
    }

    search(event) {
        if (this.searchBy === 'Name') {
            this.electivesService.search(0, event.query).then((res) => (this.suggestedElectives = res.docs));
        } else {
            this.electivesService.search(0, undefined, event.query).then((res) => (this.suggestedElectives = res.docs));
        }
    }

    addElective() {
        if (this.selectedElective) {
            this.selectedElectives.push(this.selectedElective);
        }
    }

    addElectiveToCurrentForm() {
        if (this.selectedElective) {
            this.currentForm.electives.push(this.selectedElective);
        }
    }

    createForm() {
        if (this.selectedElectives.length === 0) {
            this.toastService.red('Select at least one elective');
            return;
        }
        try {
            if (new Date(this.end).getTime() <= this.start.getTime()) {
                this.toastService.red('Select end time greater than start time');
                return;
            }
        } catch (err) {
            this.toastService.red('Select an end time');
            return;
        }
        if (
            this.numElectives < 1 ||
            this.numElectives === undefined ||
            this.numElectives > this.selectedElectives.length
        ) {
            this.toastService.red('Enter a valid number of electives');
            return;
        }
        this.formService
            .createForm(
                this.start.toISOString(),
                this.end.toISOString(),
                this.numElectives,
                this.shouldSelectAll === 'Yes',
                this.selectedElectives.map((e) => e.id)
            )
            .then((res) => {
                if (res) {
                    this.toastService.green('Form created successfully');
                    this.ngOnInit();
                } else {
                    this.toastService.red('An unknown error occurred!');
                }
            })
            .catch(() => {
                this.editDialog = false;
                this.toastService.red('An unknown error occurred!');
            });
    }

    setPageForms(event) {
        this.loading = true;
        this.page = event.first === 0 ? 0 : event.first / 25;
        this.formService.getAllForms(this.page).then((res) => {
            this.forms = [...res.docs];
            this.loading = false;
            this.totalRecords = res.count;
        });
    }

    editForm(form: IFormModel) {
        this.currentForm = { ...form };
        this.currentForm.start = new Date(this.currentForm.start);
        this.currentForm.end = new Date(this.currentForm.end);
        // @ts-ignore
        this.selectAllAtForm = this.currentForm.selectAllAtForm ? this.option[0].value : this.option[1].value;
        this.editDialog = true;
    }

    update() {
        if (this.currentForm.electives.length === 0) {
            this.toastService.red('Select at least one elective');
            return;
        }
        try {
            // @ts-ignore
            if (this.currentForm.end.getTime() <= this.currentForm.start.getTime()) {
                this.toastService.red('Select end time greater than start time');
                return;
            }
        } catch (err) {
            this.toastService.red('Select an end time');
            return;
        }
        if (
            this.currentForm.shouldSelect < 1 ||
            this.currentForm.shouldSelect === undefined ||
            this.currentForm.shouldSelect > this.currentForm.electives.length
        ) {
            this.toastService.red('Enter a valid number of electives');
            return;
        }
        this.formService
            .updateForm(
                this.currentForm.id,
                // @ts-ignore
                this.currentForm.start.toISOString(),
                // @ts-ignore
                this.currentForm.end.toISOString(),
                this.currentForm.shouldSelect,
                // @ts-ignore
                this.selectAllAtForm,
                this.currentForm.electives.map((e) => e.id)
            )
            .then((res) => {
                if (res) {
                    this.toastService.green('Form updated successfully');
                    this.editDialog = false;
                    this.ngOnInit();
                } else {
                    this.editDialog = false;
                    this.toastService.red('An unknown error occurred!');
                }
            })
            .catch(() => {
                this.editDialog = false;
                this.toastService.red('An unknown error occurred!');
            });
    }

    deleteForm(form: IFormModel) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete this form?',
            accept: () => {
                this.formService
                    .deleteForm(form.id)
                    .then(() => {
                        this.toastService.green('Form deleted successfully');
                        this.ngOnInit();
                    })
                    .catch(() => {
                        this.toastService.red('An unknown error occurred!');
                    });
            }
        });
    }

    viewResponses(form: IFormModel) {
        this.currentForm = form;
        this.setPageResponses({ first: 0 });
        this.responsesDialog = true;
    }

    setPageResponses(event) {
        this.loading = true;
        this.page = event.first === 0 ? 0 : event.first / 25;
        this.formService
            .getResponses(this.currentForm.id, this.page)
            .then((res) => {
                this.responses = [...res.docs];
                this.loading = false;
                this.totalRecords = res.count;
            })
            .catch();
    }

    generateList(form: IFormModel) {
        this.toastService.blue('Generating response results!');
        this.formService
            .generateList(form.id)
            .then(() => {
                this.toastService.green('Downloaded generated list successfully!');
            })
            .catch((err) => this.toastService.red(`An unexpected error occurred: ${err?.error?.message}`));
    }

    swapForm(form: IFormModel) {
        this.currentForm = { ...form };
        this.currentForm.start = new Date(this.currentForm.start);
        this.currentForm.end = new Date(this.currentForm.end);
        // @ts-ignore
        this.selectAllAtForm = this.currentForm.selectAllAtForm ? this.option[0].value : this.option[1].value;
        this.confirmationService.confirm({
            message: `Are you sure you want to ${this.currentForm.active ? 'disable' : 'enable'} this form?`,
            accept: () => {
                this.formService
                    .updateForm(
                        this.currentForm.id,
                        // @ts-ignore
                        this.currentForm.start.toISOString(),
                        // @ts-ignore
                        this.currentForm.end.toISOString(),
                        this.currentForm.shouldSelect,
                        // @ts-ignore
                        this.selectAllAtForm,
                        this.currentForm.electives.map((e) => e.id),
                        !this.currentForm.active
                    )
                    .then((res) => {
                        if (res) {
                            this.toastService.green(
                                `Form ${this.currentForm.active ? 'disabled' : 'enabled'} successfully`
                            );
                            this.editDialog = false;
                            this.ngOnInit();
                        } else {
                            this.editDialog = false;
                            this.toastService.red('An unknown error occurred!');
                        }
                    })
                    .catch(() => {
                        this.editDialog = false;
                        this.toastService.red('An unknown error occurred!');
                    });
            }
        });
    }

    createClasses(form: IFormModel) {
        this.confirmationService.confirm({
            message: `Are you sure you want to create classes for this form?`,
            accept: () => {
                this.formService
                    .createClasses(form.id)
                    .then(() => {
                        this.toastService.green('Create Classes successfully');
                        this.ngOnInit();
                    })
                    .catch((err) => this.toastService.red(`Could not create classes: ${err?.error?.message}`));
            }
        });
    }

    editExplicit(form: IFormModel) {
        this.explicitDialog = true;
        this.loadingExplicit = true;
        this.currentForm = { ...form };
        this.formService.getRawList(form.id).then((res) => {
            this.rawList = res.selections;
            for (const v of this.rawList) {
                // @ts-ignore
                v.electives = v.electives.map((e) => e.id);
            }
            this.electiveOptions = [...this.currentForm.electives];
            this.explicitCheckbox = Array(this.rawList.length).fill(false);
            for (const [i] of this.currentForm.explicit.entries()) {
                this.explicitCheckbox[i] = true;
            }
            this.loadingExplicit = false;
        });
    }

    viewVacancy(form: IFormModel) {
        this.vacancyDialog = true;
        this.loadingVacancy = true;
        this.currentForm = { ...form };
        this.formService.getRawList(form.id).then((res) => {
            this.vacancy = res.vacancy;
            this.loadingVacancy = false;
        });
    }

    setupNewExplicitItems() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to add these explicit choices for selected users?',
            accept: () => {
                this.explicitDialog = false;
                const finalArr = [];
                for (const [i, v] of this.rawList.map((e) => ({ user: e.user.id, electives: e.electives })).entries()) {
                    if (this.explicitCheckbox[i]) {
                        finalArr.push(v);
                    }
                }
                this.formService
                    .setExplicit(
                        this.currentForm.id,
                        // @ts-ignore
                        finalArr
                    )
                    .then(() => {
                        this.ngOnInit();
                        this.toastService.green('Updated successfully!');
                    })
                    .catch((err) => this.toastService.red(`Could not update: ${err?.error?.message}`));
            }
        });
    }
}
