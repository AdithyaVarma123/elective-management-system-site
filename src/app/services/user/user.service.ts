import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../models/general';
import constants from '../../constants';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private user = constants.server + '/users/';

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
}
