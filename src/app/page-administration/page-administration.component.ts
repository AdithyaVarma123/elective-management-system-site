import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user/user.service";
import constants from "../constants";
import {ToastService} from "../services/util/toast.service";



@Component({
  selector: 'app-page-administration',
  templateUrl: './page-administration.component.html',
  styleUrls: ['./page-administration.component.scss']
})
export class PageAdministrationComponent implements OnInit {

  eName = '';
  password = '';
  courseCode = '';
  desc = '';
  version;
  strength;
  batches = [''];
  teachers = [''];
  attributes = [{'value':'','key':''}];
  uname = '';
  rollNo = '';
  username = '';
  userRole = '';
  batch = '';
  delRol = '';
  updateName = '';
  updatePassword = '';
  updateRollNo = '';
  updateBatch = '';

  constructor(private userService: UserService,private toast: ToastService) { }

  ngOnInit() { }

  updateUser(): void {


      if (!/^\d{4}-\d-[a-zA-Z]{4,5}-[a-zA-Z]{3,4}$/.test(this.updateBatch)) {
        this.toast.red('invalid batch code');
        return;
      }
      let body = [
        {
          "name": this.updateName,
          "password": this.updatePassword,
          "rollNo": this.updateRollNo,
          "batch": this.updateBatch
        }
      ];
    this.userService.updateUser(body).then(res => {
      if(res)
        this.toast.green('elective added');
    }).catch(err => {
      this.toast.red(constants.unknownError);
    });

  }

  addElective(): void{

    for (const v of this.batches) {
      if(!/^\d{4}-\d-[a-zA-Z]{4,5}-[a-zA-Z]{3,4}$/.test(v)){
        this.toast.red('invalid batch code');
        return;
      }

    }
    const body = {
      "name": this.eName,
      "description": this.desc,
      "courseCode": this.courseCode,
      "version": ''+this.version,
      "strength": ''+this.strength,
      "attributes": this.attributes,
      "batches": this.batches,
      "teachers": this.teachers
    };
    console.log(body);
    this.userService.addelective(body).then(res => {
      if(res)
      this.toast.green('elective added');
    }).catch(err => {
      this.toast.red(constants.unknownError);
    });
  }

  addUser(): void{

      let body;
      if(this.userRole==='student')
      if(!/^\d{4}-\d-[a-zA-Z]{4,5}-[a-zA-Z]{3,4}$/.test(this.batch)){
        this.toast.red('invalid batch code');
        return;
    }
      if(this.userRole=='student'){
        body = {
          "users":{
            "name":this.uname,
            "username":this.username,
            "rollNo":this.rollNo,
            "role":this.userRole,
            "batch": this.batch,
          },
          "defaultRollNoAsEmail":true
          };
      }
      else {
        body = {
          "users": {
            "name": this.uname,
            "username": this.username,
            "rollNo": this.rollNo,
            "role": this.userRole,
          },
          "defaultRollNoAsEmail": true
        }
      }

    console.log(body);
    this.userService.addUser(body).then(res => {
      if(res)
        this.toast.green('User added');
    }).catch(err => {
      this.toast.red(constants.unknownError);
    });
  }

  uploadCSV(evt: any): void{
    this.userService.uploadcsv(evt[0],true).then(res => {
      if(res)
        this.toast.green('User added');
    }).catch(err => {
      this.toast.red(constants.unknownError);
    });
  }

  uploadCSVforElective(evt: any): void{
    this.userService.uploadcsvforelective(evt[0],true).then(res => {
      if(res)
        this.toast.green('Electives added');
    }).catch(err => {
      this.toast.red(constants.unknownError);
    });
  }


  deleteUser(): void{
    this.userService.deleteUser(this.delRol).then(res => {
      if(res)
        this.toast.green('User deleted');
    }).catch(err => {
      this.toast.red(constants.unknownError);
    });
  }
  addBatch() {
    this.batches.push('');
  }
  addTeacher() {
    this.teachers.push('');
  }
  addAttribute() {
    this.attributes.push({'value':'','key':''});
  }
  trackByIdx(index: number, obj: any): any {
    return index;
  }




}
