import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import constants from '../../constants';
import * as qs from 'query-string';
import { AuthTokens, RefreshTokens, scopes } from '../../models/general';
import { fromHexString, getCode } from '../../util/general';
import { sha256 } from 'js-sha256';
import { Base64 } from 'js-base64';
import { NotificationService } from "../util/notification.service";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private loggedIn = false;
    private accessToken = '';
    private auth = constants.server + '/oauth/';
    private interval;

    constructor(private http: HttpClient, private router: Router) {
        window.addEventListener('online', this.refreshToken);
    }

    // tslint:disable-next-line:variable-name
    login(username: string, password: string, scope: scopes, id_token = ''): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            if (this.isLoggedIn()) {
                resolve(true);
            } else {
                // tslint:disable-next-line:variable-name
                const code_verifier = getCode(64, '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~');
                // tslint:disable-next-line:variable-name
                const code_challenge = Base64.fromUint8Array(fromHexString(sha256(code_verifier)));

                const query = qs.stringify({
                    username,
                    password,
                    scope,
                    response_type: 'code',
                    client_id: 'site',
                    redirect_uri: 'https://amrita-elective.tk',
                    state: getCode(64),
                    code_challenge_method: 'S256',
                    code_challenge,
                    id_token
                });
                const outer = this.http.get(this.auth + 'authorize?' + query).subscribe(
                    (res: { code: string }) => {
                        outer.unsubscribe();
                        const inner = this.http
                            .post(this.auth + 'token', {
                                code_verifier,
                                code: res.code
                            })
                            .subscribe(
                                (tokens: AuthTokens) => {
                                    inner.unsubscribe();
                                    this.loggedIn = true;
                                    localStorage.setItem('refresh_token', tokens.refresh_token);
                                    localStorage.setItem('id_token', tokens.id_token);
                                    localStorage.setItem('scope', scope);
                                    localStorage.setItem('username', username);
                                    this.accessToken = tokens.access_token;
                                    this.refreshToken();
                                    resolve(true);
                                },
                                (err) => {
                                    inner.unsubscribe();
                                    reject(err?.error);
                                }
                            );
                    },
                    (err) => {
                        outer.unsubscribe();
                        reject(err?.error);
                    }
                );
            }
        });
    }

    attemptAutoAuth(): Promise<boolean> {
        // @ts-ignore
        return this.login('', '', localStorage.getItem('scope'), localStorage.getItem('id_token'));
    }

    logout(): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            try {
                await NotificationService.self.unsubscribeToNotifications();
            }
                // eslint-disable-next-line no-empty
            catch(err) {}
            const query = qs.stringify({
                refresh_token: localStorage.getItem('refresh_token'),
                id_token: localStorage.getItem('id_token')
            });
            localStorage.clear();
            const outer = this.http.get(this.auth + 'logout?' + query).subscribe(
                () => {
                    outer.unsubscribe();
                    this.loggedIn = false;
                    resolve(true);
                    this.router.navigate(['']).then().catch();
                },
                (err) => {
                    outer.unsubscribe();
                    this.loggedIn = false;
                    reject(err);
                    this.router.navigate(['']).then().catch();
                }
            );
        });
    }

    refreshToken(): void {
        if (this.interval) {
            clearInterval(this.interval);
        }
        this.interval = setInterval(() => {
            if (this.isLoggedIn()) {
                const outer = this.http
                    .post(this.auth + 'refresh', {
                        refresh_token: localStorage.getItem('refresh_token')
                    })
                    .subscribe(
                        (res: RefreshTokens) => {
                            outer.unsubscribe();
                            localStorage.setItem('refresh_token', res.refresh_token);
                            this.accessToken = res.access_token;
                        },
                        () => {
                            outer.unsubscribe();
                            this.attemptAutoAuth()
                                .then((status) => {
                                    if (!status) {
                                        this.logout().then().catch();
                                    }
                                })
                                .catch(() => {
                                    this.logout().then().catch();
                                });
                        }
                    );
            }
        }, constants.refreshTime);
    }

    getToken(): string {
        return this.accessToken;
    }

    isLoggedIn(): boolean {
        return this.loggedIn;
    }

    getScope(): scopes {
        // @ts-ignore
        return localStorage.getItem('scope');
    }
}
