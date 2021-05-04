import { Component, OnInit } from '@angular/core';
import { ClassesService } from '../services/classes/classes.service';
import { IClassModel } from '../models/class-model';
import { AuthService } from '../services/auth/auth.service';
import { IUserModel } from '../models/user-model';

@Component({
    selector: 'app-page-classes',
    templateUrl: './page-classes.component.html',
    styleUrls: ['./page-classes.component.scss']
})
export class PageClassesComponent implements OnInit {
    classes: IClassModel[] = [];
    isStudent = true;
    isTeacher = false;
    isAdmin = false;

    loading = false;
    page = 0;
    totalRecords = 0;

    studentsDialog = false;
    students: IUserModel[] = [];

    constructor(private classesService: ClassesService, private authService: AuthService) {
        this.isStudent = authService.getScope() === 'student';
        this.isTeacher = authService.getScope() === 'teacher';
        this.isAdmin = authService.getScope() === 'admin';
    }

    ngOnInit(): void {
        if (this.isStudent || this.isTeacher) {
            this.classesService.getActiveClasses().then((classes) => (this.classes = classes));
        } else {
            this.setPage({ first: 0 });
        }
    }

    setPage(event) {
        this.loading = true;
        this.page = event.first === 0 ? 0 : event.first / 25;
        this.classesService.getClasses(this.page).then((res) => {
            this.classes = [...res.docs];
            this.loading = false;
            this.totalRecords = res.count;
        });
    }

    viewStudents(classes: IClassModel) {
        this.classesService.getStudents(classes.id).then((res) => {
            this.students = res;
            this.studentsDialog = true;
        });
    }
}
