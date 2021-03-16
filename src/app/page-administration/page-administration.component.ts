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

  constructor(private userService: UserService,private toast: ToastService) { }

  ngOnInit() { }

  uploadCSV(evt: any): void{
    this.userService.uploadcsv(evt[0],true).then(res => {
    }).catch(err => {
      this.toast.red(constants.unknownError);
    });


  }

}
