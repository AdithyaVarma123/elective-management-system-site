import { Injectable } from '@angular/core';
import constants from "../../constants";
import { HttpClient } from "@angular/common/http";
import { IFormModel } from "../../models/form-model";
import * as qs from 'query-string';

@Injectable({
    providedIn: 'root'
})
export class FormsService {

    private forms = constants.server + '/forms/';

    constructor(private http: HttpClient) { }

    public getActiveForms(): Promise<IFormModel[]> {
        return new Promise<IFormModel[]>((resolve, reject) => {
            this.http.get(this.forms + 'active-forms').subscribe(res => {
                resolve(res as IFormModel[]);
            }, err => reject(err));
        });
    }

    public getAllForms(): Promise<IFormModel[]> {
        return new Promise<IFormModel[]>((resolve, reject) => {
            this.http.get(this.forms + '?' + qs.stringify({ pageNumber: 0, limit: 1000 })).subscribe(res => {
                // @ts-ignore
                resolve(res.docs as IFormModel[]);
            }, err => reject(err));
        });
    }

    public createForm(start: string, end: string, numElectives: number, shouldSelectAll: boolean, electives: string[]): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.http.put(this.forms + 'create-form', {
                start,
                end,
                numElectives,
                shouldSelectAll,
                electives
            }).subscribe(res => resolve(true), err => reject(err));
        });
    }
}
