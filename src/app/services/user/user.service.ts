import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/general';
import constants from '../../constants';
import { boolToString } from '../../util/general';
import * as qs from 'query-string';
import {NotificationService} from "../util/notification.service";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private user = constants.server + '/users/';
    private electives = constants.server + '/electives/';
    private notification = constants.server + '/notifications/';

    constructor(private http: HttpClient) {}

    getBasic(): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            const outer = this.http.get(this.user + 'basic').subscribe(
                (res) => {
                    outer.unsubscribe();
                    resolve(res as User);
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

    addelective(body): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            const outer = this.http.post(this.electives + 'add', body).subscribe(
                (res: any) => {
                    outer.unsubscribe();
                    console.log(res);
                    if (res.failed.length == 0) resolve(true);
                    else resolve(false);
                },
                (err) => {
                    console.log(err);
                    outer.unsubscribe();
                    reject(err);
                }
            );
            console.log(outer);
        });
    }

    addUser(body): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            const outer = this.http.post(this.user + 'create', body).subscribe(
                (res: any) => {
                    outer.unsubscribe();
                    console.log(res);
                    if (res.failed.length == 0) resolve(true);
                    else resolve(false);
                },
                (err) => {
                    console.log(err);
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
                    console.log(res);
                    if (res.failed.length == 0) resolve(true);
                    else resolve(false);
                },
                (err) => {
                    console.log(err);
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
                (res) => {
                    console.log(res);
                    outer.unsubscribe();
                    resolve(true);
                },
                (err) => {
                    console.log(err);
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
                        console.log(res);
                        resolve(res.id);
                    },
                    (err) => {
                        console.log(err);
                        reject(err);
                    }
                );
            });
            const outer = this.http.request('delete', this.user + 'delete', { body: [id] });
            outer.subscribe(
                (res) => {
                    console.log(res);
                    resolve(true);
                },
                (err) => {
                    console.log(err);
                    reject(err);
                }
            );
        });
    }

    uploadcsvforelective(file: File, defaultroll: boolean): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            const data = new FormData();
            data.append('file', file, file.name);
            data.append('defaultRollNoAsEmail', boolToString(defaultroll));
            const outer = this.http.post(this.electives + 'add-csv', data).subscribe(
                (res) => {
                    console.log(res);
                    outer.unsubscribe();
                    resolve(true);
                },
                (err) => {
                    console.log(err);
                    outer.unsubscribe();
                    reject(err);
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
