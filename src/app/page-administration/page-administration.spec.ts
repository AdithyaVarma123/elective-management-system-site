import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAdministrationComponent } from './page-administration.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageService } from 'primeng/api';
import { ServiceWorkerModule } from '@angular/service-worker';
import { UserService } from '../services/user/user.service';


describe('PageAdministrationComponent', () => {
    let component: PageAdministrationComponent;
    let fixture: ComponentFixture<PageAdministrationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PageAdministrationComponent],
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                ServiceWorkerModule.register('ngsw-worker.js', { enabled: false })
            ],
            providers: [MessageService,UserService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PageAdministrationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

  it('should add user', () => {
    component.addUser();
    const body = {
      users: {
        name: 'sreekar',
        username:'sreekar-test',
        rollNo: 'cb.en.u4cse18123',
        role: 'student',
        batch: '2018-4BTECH-CSE'
      },
      defaultRollNoAsEmail: true
    };
    const userService = TestBed.get(UserService);
    expect(userService.addUser(body)).toBeTruthy();
  });

  it('delete user', () => {
    component.deleteUser();
    const userService = TestBed.get(UserService);
    expect(userService.deleteUser('cb.en.u4cse18182')).toBeTruthy();
  });
});
