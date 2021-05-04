import { Injectable } from '@angular/core';
import constants from '../../constants';
import { HttpClient } from '@angular/common/http';
import { IClassModel } from '../../models/class-model';
import { PaginationModel } from '../../models/pagination-model';
import * as qs from 'query-string';
import { IUserModel } from '../../models/user-model';
import { IDownloadModel } from '../../models/download-model';
import { boolToString } from '../../util/general';

@Injectable({
    providedIn: 'root'
})
export class ClassesService {
    private classes = constants.server + '/classes/';
    private classResource = constants.server + '/downloads/class-resource/';

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

    public getResource(fileId: string, name: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.http.get(this.classResource + '?' + qs.stringify({ fileId }), { responseType: 'blob' }).subscribe(
                (fileRes) => {
                    const a = document.createElement('a');
                    const objectUrl = URL.createObjectURL(fileRes);
                    a.href = objectUrl;
                    a.download = name;
                    a.click();
                    URL.revokeObjectURL(objectUrl);
                    resolve();
                },
                (err) => reject(err)
            );
        });
    }

    public getTracked(fileId: string): Promise<IDownloadModel> {
        return new Promise<IDownloadModel>((resolve, reject) => {
            this.http.get(this.classResource + 'tracked?' + qs.stringify({ fileId })).subscribe(
                (res: IDownloadModel) => resolve(res),
                (err) => reject(err)
            );
        });
    }

    addResource(file: File, classId: string, shouldTrack: boolean): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            const data = new FormData();
            data.append('file', file, file.name);
            data.append('shouldTrack', boolToString(shouldTrack));
            data.append('classId', classId);
            this.http.post(this.classResource, data).subscribe(
                () => resolve(true),
                (err) => reject(err)
            );
        });
    }

    deleteResource(fileId: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.http.delete(this.classResource + '?' + qs.stringify({ fileId })).subscribe(
                () => resolve(),
                (err) => reject(err)
            );
        });
    }
}
