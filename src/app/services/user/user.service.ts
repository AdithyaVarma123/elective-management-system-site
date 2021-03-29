import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../models/general';
import constants from '../../constants';
import {boolToString, getCode} from "../../util/general";
import * as qs from "query-string";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private user = constants.server + '/users/';
    private electives = constants.server + '/electives/';

    constructor(private http: HttpClient) {}

    getBasic(): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            const outer = this.http.get(this.user + 'basic').subscribe(res => {
                outer.unsubscribe();
                resolve(res as User);
            }, err => {
                outer.unsubscribe();
                reject(err);
            });
        });
    }

    changePassword(oldPassword: string,newPassword: string): Promise<boolean> {

        return new Promise<boolean>((resolve, reject) => {
            const outer = this.http.put(this.user + 'changePassword',{
                oldPassword,
                newPassword
            }).subscribe(res => {
                outer.unsubscribe();
                resolve(true);
            }, err => {
                outer.unsubscribe();
                reject(err);
            });
        });
    }

    resetPassword(email:string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            const outer = this.http.put(this.user + 'requestReset',{
                user:email
            }).subscribe(res => {
                outer.unsubscribe();
                resolve(true);
            }, err => {
                outer.unsubscribe();
                reject(err);
            });
        });
    }

    addelective(body): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            const outer = this.http.post(this.electives + 'add',body
            ).subscribe((res:any) => {
                outer.unsubscribe();
                console.log(res);
                if(res.failed.length==0)
                resolve(true);
                else
                    resolve(false);
            }, err => {
                console.log(err);
                outer.unsubscribe();
                reject(err);
            });
        });
    }

    addUser(body): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            const outer = this.http.post(this.user + 'create',body
            ).subscribe((res:any) => {
                outer.unsubscribe();
                console.log(res);
                if(res.failed.length==0)
                    resolve(true);
                else
                    resolve(false);
            }, err => {
                console.log(err);
                outer.unsubscribe();
                reject(err);
            });
        });
    }

    updateUser(body): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            const outer = this.http.put(this.user + 'update',body
            ).subscribe((res:any) => {
                outer.unsubscribe();
                console.log(res);
                if(res.failed.length==0)
                    resolve(true);
                else
                    resolve(false);
            }, err => {
                console.log(err);
                outer.unsubscribe();
                reject(err);
            });
        });
    }

    uploadcsv(file: File,defaultroll:boolean): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            const data =new FormData();
            data.append('file',file,file.name);
            data.append('defaultRollNoAsEmail',boolToString(defaultroll));
            const outer = this.http.post(this.user + 'create-csv',
                data,
            ).subscribe(res => {
                console.log(res);
                outer.unsubscribe();
                resolve(true);
            }, err => {
                console.log(err);
                outer.unsubscribe();
                reject(err);
            });
        });
    }

    deleteUser(delRol): Promise<boolean> {
        let body = [delRol];
        return new Promise<boolean>((resolve, reject) => {
            const outer = this.http.request('delete', this.user + 'delete', { body });
            outer.subscribe(res => {
                console.log(res);
                resolve(true);
            }, err => {
                console.log(err);
                reject(err);
            });
        });
    }

    uploadcsvforelective(file: File,defaultroll:boolean): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            const data =new FormData();
            data.append('file',file,file.name);
            data.append('defaultRollNoAsEmail',boolToString(defaultroll));
            const outer = this.http.post(this.electives + 'add-csv',
                data,
            ).subscribe(res => {
                console.log(res);
                outer.unsubscribe();
                resolve(true);
            }, err => {
                console.log(err);
                outer.unsubscribe();
                reject(err);
            });
        });
    }

    resetpass(password:string,code:string): Promise<boolean>{
        return new Promise<boolean>((resolve, reject) => {
            const outer = this.http.put(this.user + 'resetPassword',{
                password:password,
                code:code
            }).subscribe(res => {
                outer.unsubscribe();
                resolve(true);
            }, err => {
                outer.unsubscribe();
                reject(err);
            });
        });
    }
}
