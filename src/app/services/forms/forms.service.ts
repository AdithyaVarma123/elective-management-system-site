import { Injectable } from '@angular/core';
import constants from '../../constants';
import { HttpClient } from '@angular/common/http';
import { IFormModel } from '../../models/form-model';
import * as qs from 'query-string';
import { PaginationModel } from '../../models/pagination-model';
import { IResponseModel } from '../../models/response-model';

@Injectable({
    providedIn: 'root'
})
export class FormsService {
    private forms = constants.server + '/forms/';
    private formsResponse = constants.server + '/form-response/';

    constructor(private http: HttpClient) {}

    public getActiveForms(): Promise<IFormModel[]> {
        return new Promise<IFormModel[]>((resolve, reject) => {
            this.http.get(this.forms + 'active-forms').subscribe(
                (res: IFormModel[]) => {
                    const now = new Date().getTime();
                    res = res.map((e) => ({ ...e, state: new Date(e.end).getTime() > now }));
                    resolve(res);
                },
                (err) => reject(err)
            );
        });
    }

    public getAllForms(pageNumber: number): Promise<PaginationModel<IFormModel>> {
        return new Promise<PaginationModel<IFormModel>>((resolve, reject) => {
            this.http.get(this.forms + '?' + qs.stringify({ pageNumber, limit: 25 })).subscribe(
                (res: PaginationModel<IFormModel>) => {
                    const now = new Date().getTime();
                    res.docs = res.docs.map((e) => ({
                        ...e,
                        state: new Date(e.end).getTime() > now,
                        start: new Date(e.start).toLocaleString(),
                        end: new Date(e.end).toLocaleString()
                    }));
                    resolve(res);
                },
                (err) => reject(err)
            );
        });
    }

    public createForm(
        start: string,
        end: string,
        numElectives: number,
        shouldSelectAll: boolean,
        electives: string[]
    ): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.http
                .put(this.forms + 'create-form', {
                    start,
                    end,
                    numElectives,
                    shouldSelectAll,
                    electives
                })
                .subscribe(
                    () => resolve(true),
                    (err) => reject(err)
                );
        });
    }

    public updateForm(
        id: string,
        start: string,
        end: string,
        shouldSelect: number,
        selectAllAtForm: boolean,
        electives: string[]
    ): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.http
                .post(this.forms, {
                    id,
                    start,
                    end,
                    shouldSelect,
                    selectAllAtForm,
                    electives
                })
                .subscribe(
                    () => resolve(true),
                    (err) => reject(err)
                );
        });
    }

    public respondToForm(id: string, electives: string[]): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.http.put(this.formsResponse, { id, electives }).subscribe(
                () => resolve(true),
                (err) => reject(err)
            );
        });
    }

    public deleteForm(id: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.http.delete(this.forms + '?' + qs.stringify({ id })).subscribe(
                () => resolve(true),
                (err) => reject(err)
            );
        });
    }

    public getResponses(id: string, pageNumber: number): Promise<PaginationModel<IResponseModel>> {
        return new Promise<PaginationModel<IResponseModel>>((resolve, reject) => {
            this.http.get(this.formsResponse + '?' + qs.stringify({ id, pageNumber, limit: 25 })).subscribe(
                (res: PaginationModel<IResponseModel>) => {
                    // @ts-ignore
                    res.docs = res.docs.map((e) => ({ ...e, time: new Date(e.time).toLocaleString() }));
                    resolve(res);
                },
                (err) => reject(err)
            );
        });
    }
}
