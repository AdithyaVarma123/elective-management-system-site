import { Injectable } from '@angular/core';
import {MessageService} from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    constructor(private messageService: MessageService) {}
    green(summary: string, life = 3000, sticky = false, detail = '', id = ''): void {
        this.messageService.add({
            severity: 'success',
            summary,
            detail,
            life,
            id
        });
    }
    yellow(summary: string, life = 3000, sticky = false, detail = '', id = ''): void {
        this.messageService.add({
            severity: 'warn',
            summary,
            detail,
            life,
            id
        });
    }
    red(summary: string, life = 3000, sticky = false, detail = '', id = ''): void {
        this.messageService.add({
            severity: 'error',
            summary,
            detail,
            life,
            id
        });
    }
    blue(summary: string, life = 3000, sticky = false, detail = '', id = ''): void {
        this.messageService.add({
            severity: 'info',
            summary,
            detail,
            life,
            id
        });
    }
}
