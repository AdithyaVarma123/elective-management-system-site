import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    constructor(private messageService: MessageService) {}
    green(summary: string, life = 3000, sticky = false, detail = '', id = ''): void {
        this.messageService.add({
            sticky,
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
            sticky,
            summary,
            detail,
            life,
            id
        });
    }
    red(summary: string, life = 3000, sticky = false, detail = '', id = ''): void {
        this.messageService.add({
            severity: 'error',
            sticky,
            summary,
            detail,
            life,
            id
        });
    }
    blue(summary: string, life = 3000, sticky = false, detail = '', id = ''): void {
        this.messageService.add({
            sticky,
            severity: 'info',
            summary,
            detail,
            life,
            id
        });
    }
}
