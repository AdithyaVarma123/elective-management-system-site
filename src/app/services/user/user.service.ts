import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import constants from '../../constants';
import { boolToString } from '../../util/general';
import * as qs from 'query-string';
import { NotificationService } from '../util/notification.service';
import { IUserModel } from '../../models/user-model';
import {ToastService} from "../util/toast.service";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private user = constants.server + '/users/';
    private notification = constants.server + '/notifications/';

    constructor(private http: HttpClient,private toastService: ToastService,) {}

    getBasic(): Promise<IUserModel> {
        return new Promise<IUserModel>((resolve, reject) => {
            const outer = this.http.get(this.user + 'basic').subscribe(
                (res) => {
                    outer.unsubscribe();
                    resolve(res as IUserModel);
                },
                (err) => {
                    outer.unsubscribe();
                    reject(err);
                }
            );
        });
    }

    changePassword(oldPassword: string, newPassword: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            const outer = this.http
                .put(this.user + 'changePassword', {
                    oldPassword,
                    newPassword
                })
                .subscribe(
                    (res: any) => {
                        outer.unsubscribe();
                        resolve(res.status);
                    },
                    (err) => {
                        outer.unsubscribe();
                        reject(err);
                    }
                );
        });
    }

    resetPassword(email: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            const outer = this.http
                .put(this.user + 'requestReset', {
                    user: email
                })
                .subscribe(
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

    addUser(body): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            const outer = this.http.post(this.user + 'create', body).subscribe(
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

    updateUser(body): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            const outer = this.http.put(this.user + 'update', body).subscribe(
                (res: any) => {
                    outer.unsubscribe();
                    if (res.failed.length == 0) resolve(true);
                    else {
                        console.log(res);
                        resolve(false);
                    };
                },
                (err) => {
                    outer.unsubscribe();
                    reject(err);
                }
            );
        });
    }

    uploadcsv(file: File, defaultroll: boolean): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            const data = new FormData();
            data.append('file', file, file.name);
            data.append('defaultRollNoAsEmail', boolToString(defaultroll));
            const outer = this.http.post(this.user + 'create-csv', data).subscribe(
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

    deleteUser(delRol): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            const query = qs.stringify({
                rollNo: delRol
            });
            const id = await new Promise<string>((resolve, reject) => {
                const outer = this.http.get(this.user + 'user-by-roll-no?' + query);
                outer.subscribe(
                    (res: any) => {
                        resolve(res.id);
                    },
                    (err) => {
                        this.toastService.red('Incorrect Roll Number');
                        reject(err);
                    }
                );
            });
            const outer = this.http.request('delete', this.user + 'delete', { body: [id] });
            outer.subscribe(
                () => {
                    resolve(true);
                },
                (err) => {
                    reject(err);
                }
            );
        });
    }

    getlogDetails(page, sortBy, dir = 'desc'): any {
        const query = qs.stringify({
            page: page,
            sortBy: sortBy,
            dir: dir
        });
        return new Promise<any>((resolve) => {
            const outer = this.http.get(this.user + 'tracked-data?' + query).subscribe(
                (res: any) => {
                    res.docs = res.docs.map((e) => ({
                        ...e,
                        rollNo: e.user.rollNo,
                        createdAt: new Date(e.createdAt).toLocaleString()
                    }));
                    resolve(res);
                },
                () => {
                    outer.unsubscribe();
                }
            );
        });
    }

    getNotificationStatus(): Promise<boolean> {
        const query = qs.stringify({
            name: NotificationService.getBrowserName() + NotificationService.getName()
        });
        return new Promise<boolean>((resolve, reject) => {
            const outer = this.http.get(this.notification + 'isSubscribed?' + query).subscribe(
                (res: any) => {
                    if (res['subscribed']) resolve(true);
                    else resolve(false);
                    outer.unsubscribe();
                },
                (err) => {
                    outer.unsubscribe();
                    reject(err);
                }
            );
        });
    }

    unsubscribe(): Promise<boolean> {
        const body = {};
        return new Promise<boolean>((resolve, reject) => {
            const outer = this.http.post(this.notification + 'isSubscribed', body).subscribe(
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

    subscribeNotif(): Promise<boolean> {
        const body = {};
        return new Promise<boolean>((resolve, reject) => {
            const outer = this.http.put(this.notification + 'subscribe', body).subscribe(
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

    resetpass(password: string, code: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            const outer = this.http
                .put(this.user + 'resetPassword', {
                    password: password,
                    code: code
                })
                .subscribe(
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
}
