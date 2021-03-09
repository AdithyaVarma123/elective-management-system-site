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
}
