import { Injectable } from '@angular/core';
import constants from '../../constants';
import { HttpClient } from '@angular/common/http';
import { IFormModel } from '../../models/form-model';
import * as qs from 'query-string';
import { PaginationModel } from '../../models/pagination-model';
import { IResponseModel } from '../../models/response-model';
import { Failed, rawListType, vacancyType } from "../../models/general";
import { IUserModel } from "../../models/user-model";
import { IElectiveModel } from "../../models/elective-model";

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
        electives: string[],
        active?: boolean
    ): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.http
                .post(this.forms, {
                    id,
                    start,
                    end,
                    shouldSelect,
                    selectAllAtForm,
                    electives,
                    active
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

    public generateList(id: string) {
        return new Promise<boolean>((resolve, reject) => {
            this.http.get(this.forms + 'generate-elective-list?' + qs.stringify({ id })).subscribe(
                (res: { status: boolean; downloadUri: string; failed?: any[] }) => {
                    if (res.status) {
                        this.http.get(res.downloadUri, { responseType: 'blob' }).subscribe(
                            (fileRes) => {
                                const a = document.createElement('a');
                                const objectUrl = URL.createObjectURL(fileRes);
                                a.href = objectUrl;
                                a.download = `${id}.csv`;
                                a.click();
                                URL.revokeObjectURL(objectUrl);
                                resolve(true);
                            },
                            (err) => reject(err)
                        );
                    } else {
                        reject({ message: res?.failed });
                    }
                },
                (err) => reject(err)
            );
        });
    }

    public createClasses(formId: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.http.post(this.forms + 'create-classes?' + qs.stringify({ formId }), {}).subscribe(
                () => resolve(true),
                (err) => reject(err)
            );
        });
    }

    public getRawList(id: string): Promise<{
        selections: { user: IUserModel; electives: IElectiveModel[] }[];
        unresponsive: IUserModel[],
        failed: Failed[],
        vacancy: { elective: IElectiveModel; vacancy: number }[];
    }> {
        return new Promise<{
            selections: { user: IUserModel; electives: IElectiveModel[] }[];
            unresponsive: IUserModel[],
            failed: Failed[],
            vacancy: { elective: IElectiveModel; vacancy: number }[];
        }>((resolve, reject) => {
            this.http.get(this.forms + 'raw-list?' + qs.stringify({ id })).subscribe(
                (res: {
                    selections: { user: IUserModel; electives: IElectiveModel[] }[];
                    unresponsive: IUserModel[],
                    failed: Failed[],
                    vacancy: { elective: IElectiveModel; vacancy: number }[];
                }) => resolve(res),
                (err) => reject(err)
            );
        });
    }

    public setExplicit(id: string, options: { user: string; elective: string }[]): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.http
                .put(this.forms + 'explicit', {
                    id,
                    options
                })
                .subscribe(
                    () => resolve(true),
                    (err) => reject(err)
                );
        });
    }
}
