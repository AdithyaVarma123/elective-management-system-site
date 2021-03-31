import { Injectable } from '@angular/core';
import {SwPush} from '@angular/service-worker';
import {HttpClient} from '@angular/common/http';
import constants from '../../constants';
import {DeviceUUID} from 'device-uuid';
import {Router} from '@angular/router';
@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    constructor(
        private swPush: SwPush,
        private http: HttpClient,
        private router: Router
    ) {}

    readonly VAPID_PUBLIC_KEY = 'BM1czT5G3TkD1ieKRhPVozuoxC0DYwaC3np25qh0LaQpIYz0V6Ux5XdN-43TZ-oMuVwBMn53QXT5qV8wzgtXtqg';
    private url = constants.server + '/notifications/';

    private static getName(): string {
        const name = localStorage.getItem('name');
        if (name !== null && name !== undefined && name.length > 0) {
            return name;
        }
        else {
            localStorage.setItem('name', new DeviceUUID().get());
            return localStorage.getItem('name');
        }
    }

    private static getBrowserName(): string {
        const { userAgent } = navigator;
        let match = userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        let temp;

        if (/trident/i.test(match[1])) {
            temp = /\brv[ :]+(\d+)/g.exec(userAgent) || [];

            return `IE ${temp[1] || ''}`;
        }

        if (match[1] === 'Chrome') {
            temp = userAgent.match(/\b(OPR|Edge)\/(\d+)/);

            if (temp !== null) {
                return temp.slice(1).join(' ').replace('OPR', 'Opera');
            }

            temp = userAgent.match(/\b(Edg)\/(\d+)/);

            if (temp !== null) {
                return temp.slice(1).join(' ').replace('Edg', 'Edge (Chromium)');
            }
        }

        match = match[2] ? [ match[1], match[2] ] : [ navigator.appName, navigator.appVersion, '-?' ];
        temp = userAgent.match(/version\/(\d+)/i);

        if (temp !== null) {
            match.splice(1, 1, temp[1]);
        }

        return match.join(' ');
    }

    public subscribeToNotifications(): void {
        if (this.swPush.isEnabled) {
            this.swPush.requestSubscription({ serverPublicKey: this.VAPID_PUBLIC_KEY })
            .then(sub => {
                this.http.put(this.url + 'subscribe',
                    { sub, name: NotificationService.getBrowserName() + NotificationService.getName() }).subscribe();
                this.clickHandler();
            })
            .catch(err => console.error('Could not subscribe to notifications', err));
        }
    }

    public clickHandler(): void {
        this.swPush.notificationClicks.subscribe(res => {
            switch (res.action) {
                case 'home': {
                    this.router.navigate(['']).then().catch();
                    break;
                }
                case 'profile': {
                    this.router.navigate(['/profile']).then().catch();
                    break;
                }
            }
        });
    }
}
