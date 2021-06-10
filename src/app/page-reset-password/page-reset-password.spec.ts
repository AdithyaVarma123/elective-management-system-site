import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageResetPasswordComponent } from './page-reset-password.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageService } from 'primeng/api';
import { UserService } from '../services/user/user.service';

describe('PageResetPasswordComponent', () => {
    let component: PageResetPasswordComponent;
    let fixture: ComponentFixture<PageResetPasswordComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PageResetPasswordComponent],
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [MessageService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PageResetPasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

  it('reset password', () => {
    component.reset();
    component.newpass = 'Abc19@';
    component.confirmpass = 'Abc19@';
      const user = TestBed.get(UserService);
      expect(user.resetpass(component.newpass, component.code).then()).toBeTruthy();
  });
});
