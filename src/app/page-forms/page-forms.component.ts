import { Component, OnInit } from "@angular/core";
import { FormsService } from "../services/forms/forms.service";
import { AuthService } from "../services/auth/auth.service";
import { ElectivesService } from "../services/electives/electives.service";
import { IElectiveModel } from "../models/elective-model";
import { ToastService } from "../services/util/toast.service";
import { Router } from "@angular/router";
import { IFormModel } from "../models/form-model";
import { ConfirmationService } from "primeng/api";
import { IResponseModel } from "../models/response-model";

interface item {name:string,value:boolean}

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

    constructor(
        private formService: FormsService,
        public authService: AuthService,
        private electivesService: ElectivesService,
        private toastService: ToastService,
        private router: Router,
        private confirmationService: ConfirmationService
    ) {
        this.option = [{name: 'Yes', value: true}, {name: 'No', value: false}];
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
        this.formService.getActiveForms().then(res => {
            this.activeForms = res.map(e => ({...e, end: new Date(e.end).toLocaleString(), start: new Date(e.start).toLocaleString() }))
        });
        this.resetForm();
        if (this.authService.getScope() !== 'student') {
            this.setPageForms({first: 0});
        }
    }

    openForm(idx: number) {
        this.router.navigate(['fill-form', this.activeForms[idx].id]).then().catch();
    }

    search(event) {
        if (this.searchBy === 'Name') {
            this.electivesService.search(0, event.query).then(res => this.suggestedElectives = res);
        }
        else {
            this.electivesService.search(0, undefined, event.query).then(res => this.suggestedElectives = res);
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
        }
        catch(err) {
            this.toastService.red('Select an end time');
            return;
        }
        if (this.numElectives < 1 || this.numElectives === undefined || this.numElectives > this.selectedElectives.length) {
            this.toastService.red('Enter a valid number of electives');
            return;
        }
        this.formService.createForm(this.start.toISOString(), this.end.toISOString(), this.numElectives, this.shouldSelectAll, this.selectedElectives.map(e => e.id))
            .then(res => {
                if (res) {
                    this.toastService.green('Form created successfully');
                    this.ngOnInit();
                }
                else {
                    this.toastService.red('An unknown error occurred!');
                }
            }).catch(err => {
            this.editDialog = false;
            this.toastService.red('An unknown error occurred!');
        });
    }

    setPageForms(event) {
        this.loading = true;
        this.page = event.first === 0 ? 0 : event.first / 25;
        this.formService.getAllForms(this.page).then(res => {
            this.forms = [...res.docs];
            this.loading = false;
            this.totalRecords = res.count;
        });
    }

    editForm(form: IFormModel) {
        this.currentForm = {...form};
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
        }
        catch(err) {
            this.toastService.red('Select an end time');
            return;
        }
        if (this.currentForm.shouldSelect < 1 || this.currentForm.shouldSelect === undefined || this.currentForm.shouldSelect > this.currentForm.electives.length) {
            this.toastService.red('Enter a valid number of electives');
            return;
        }
        // @ts-ignore
        this.formService.updateForm(this.currentForm.id, this.currentForm.start.toISOString(), this.currentForm.end.toISOString(), this.currentForm.shouldSelect, this.selectAllAtForm, this.currentForm.electives.map(e => e.id))
        .then(res => {
            if (res) {
                this.toastService.green('Form updated successfully');
                this.editDialog = false;
                this.ngOnInit();
            }
            else {
                this.editDialog = false;
                this.toastService.red('An unknown error occurred!');
            }
        }).catch(err => {
            this.editDialog = false;
            this.toastService.red('An unknown error occurred!');
        });
    }

    deleteForm(form: IFormModel) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete this form?',
            accept: () => {
                this.formService.deleteForm(form.id).then(res => {
                    this.toastService.green('Form updated successfully');
                    this.ngOnInit();
                })
                .catch(err => {
                    this.toastService.red('An unknown error occurred!');
                });
            }
        });
    }

    viewResponses(form: IFormModel) {
        this.currentForm = form;
        this.setPageResponses({first: 0});
        this.responsesDialog = true;
    }

    setPageResponses(event) {
        this.loading = true;
        this.page = event.first === 0 ? 0 : event.first / 25;
        this.formService.getResponses(this.currentForm.id, this.page).then(res => {
            this.responses = [...res.docs];
            this.loading = false;
            this.totalRecords = res.count;
        });
    }

}
