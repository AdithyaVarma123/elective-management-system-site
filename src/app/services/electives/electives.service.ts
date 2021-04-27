import { Injectable } from '@angular/core';
import constants from '../../constants';
import { boolToString } from '../../util/general';
import { HttpClient } from '@angular/common/http';
import { IElectiveModel } from '../../models/elective-model';
import * as qs from 'query-string';
import { PaginationModel } from '../../models/pagination-model';

@Injectable({
    providedIn: 'root'
})
export class ElectivesService {
    private electives = constants.server + '/electives/';

    constructor(private http: HttpClient) {}

    addElective(body): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            const outer = this.http.post(this.electives + 'add', body).subscribe(
                (res: any) => {
                    outer.unsubscribe();
                    if (res.failed.length == 0) resolve(true);
                    else resolve(false);
                },
                (err) => {
                    outer.unsubscribe();
                    reject(err);
                }
            );
        });
    }

    addElectivesCSV(file: File, defaultroll: boolean): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            const data = new FormData();
            data.append('file', file, file.name);
            data.append('defaultRollNoAsEmail', boolToString(defaultroll));
            const outer = this.http.post(this.electives + 'add-csv', data).subscribe(
                () => {
                    outer.unsubscribe();
                    resolve(true);
                },
                (err) => {
                    outer.unsubscribe();
                    reject(err);
                }
            );
        });
    }

    updateElectives(body: any): Promise<{ status: boolean; message?: string }> {
        return new Promise<{ status: boolean; message?: string }>((resolve, reject) => {
            this.http.post(this.electives, body).subscribe(
                () => resolve({ status: true }),
                (err) => reject(err)
            );
        });
    }

    search(
        pageNumber: number,
        name?: string,
        courseCode?: string,
        sortBy = 'name'
    ): Promise<PaginationModel<IElectiveModel>> {
        return new Promise<PaginationModel<IElectiveModel>>((resolve, reject) => {
            this.http
                .get(
                    this.electives +
                        '?' +
                        qs.stringify({
                            pageNumber,
                            name,
                            courseCode,
                            sortBy,
                            limit: 25
                        })
                )
                .subscribe(
                    (res) => {
                        // @ts-ignore
                        resolve(res);
                    },
                    (err) => reject(err)
                );
        });
    }

    deleteElective(id: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.http.delete(this.electives + '?' + qs.stringify({ id })).subscribe(
                () => resolve(true),
                (err) => reject(err)
            );
        });
    }
}
