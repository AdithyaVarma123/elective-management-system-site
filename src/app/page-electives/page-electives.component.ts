import { Component, OnInit } from '@angular/core';
import { FormsService } from "../services/forms/forms.service";
import { AuthService } from "../services/auth/auth.service";
import { ElectivesService } from "../services/electives/electives.service";
import { IElectiveModel } from "../models/elective-model";
import { ToastService } from "../services/util/toast.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-page-electives',
    templateUrl: './page-electives.component.html',
    styleUrls: ['./page-electives.component.scss'],
})
export class PageElectivesComponent implements OnInit {

    start = new Date();
    end;
    numElectives;
    shouldSelectAll = 'Yes';
    selectedElective;
    searchBy = 'Name';
    suggestedElectives: IElectiveModel[] = [];
    selectedElectives: IElectiveModel[] = [];
    forms = [];

    constructor(
        private formService: FormsService,
        public authService: AuthService,
        private electivesService: ElectivesService,
        private toastService: ToastService,
        private router: Router
    ) {}

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
        if (this.authService.getScope() === 'student') {
            this.formService.getActiveForms().then(res => {
                this.forms = res.map(e => ({...e, end: new Date(e.end).toLocaleString(), start: new Date(e.start).toLocaleString() }))
            });
        }
        else {
            this.formService.getAllForms().then(res => {
                this.forms = res.map(e => ({...e, end: new Date(e.end).toLocaleString(), start: new Date(e.start).toLocaleString() }))
            });
        }
        this.resetForm();
    }

    openForm(idx: number) {
        this.router.navigate(['fill-form', idx]).then().catch();
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

    createForm() {
        if (this.selectedElectives.length === 0) {
            this.toastService.red('Select at least one elective');
        }
        try {
            if (new Date(this.end).getTime() <= this.start.getTime()) {
                this.toastService.red('Select end time greater than start time');
                return;
            }
        }
        catch(err) {
            this.toastService.red('Select an end time');
        }
        if (this.numElectives < 1 || this.numElectives === undefined || this.numElectives > this.selectedElectives.length) {
            this.toastService.red('Enter a valid number of electives');
        }
        this.formService.createForm(this.start.toISOString(), this.end.toISOString(), this.numElectives, this.shouldSelectAll === 'Yes' ? true : false, this.selectedElectives.map(e => e.id))
            .then(res => {
                if (res) {
                    this.toastService.green('Form created successfully');
                    this.ngOnInit();
                }
                else {
                    this.toastService.red('An unknown error occurred!');
                }
            });
    }

}
