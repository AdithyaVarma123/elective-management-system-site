import { Injectable } from '@angular/core';
import constants from '../../constants';
import { HttpClient } from '@angular/common/http';
import { IClassModel } from '../../models/class-model';
import { PaginationModel } from '../../models/pagination-model';
import * as qs from 'query-string';
import { IUserModel } from '../../models/user-model';

@Injectable({
    providedIn: 'root'
})
export class ClassesService {
    private classes = constants.server + '/classes/';

    constructor(private http: HttpClient) {}

    public getActiveClasses(): Promise<IClassModel[]> {
        return new Promise<IClassModel[]>((resolve, reject) => {
            this.http.get(this.classes + 'active').subscribe(
                (res: IClassModel[]) => resolve(res),
                (err) => reject(err)
            );
        });
    }

    public getClasses(page: number): Promise<PaginationModel<IClassModel>> {
        return new Promise<PaginationModel<IClassModel>>((resolve, reject) => {
            this.http
                .get(
                    this.classes +
                        '?' +
                        qs.stringify({
                            page,
                            dir: 'asc',
                            sortBy: 'batch'
                        })
                )
                .subscribe(
                    (res: PaginationModel<IClassModel>) => resolve(res),
                    (err) => reject(err)
                );
        });
    }

    public getStudents(id: string): Promise<IUserModel[]> {
        return new Promise<IUserModel[]>((resolve, reject) => {
            this.http.get(this.classes + 'students?' + qs.stringify({ id })).subscribe(
                (res: IUserModel[]) => resolve(res),
                (err) => reject(err)
            );
        });
    }
}
