import { Component, OnInit, Inject, Input } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { User } from '../models/user';
import { ProjectService } from '../project.service';
import { Project } from '../models/project';

export interface UserModalData {
  passwordCheck: String;
  user: User;
  origin: String;
}

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent implements OnInit {
  
  @Input()
  user: User;
  
  projects: Project[];

  validationMessage:string;
  
  
  constructor(public dialogRef: MatDialogRef<UserModalComponent>,@Inject(MAT_DIALOG_DATA) public data: UserModalData, private projectService: ProjectService) {
  }
  
  ngOnInit(){
    this.reloadAll();}

    reloadAll(){
    this.projectService.findAll().subscribe(projects => this.projects = projects);
  }

  validateRegistration(){
    if (this.data.user.username == undefined)
    this.validationMessage = "Name cannot be empty"
    else if (this.data.user.password == undefined)
    this.validationMessage = "Password cannot be empty"
    else if (this.data.passwordCheck != this.data.user.password)
    this.validationMessage = "Second password not identical to first"
    else if (this.data.user.id == undefined)
    this.validationMessage = "Project field cannot be empty"

    confirm(this.validationMessage)
  }

  validateLogin(){
    if (this.data.user.username == undefined)
    this.validationMessage = "Name cannot be empty"
    else if (this.data.user.password == undefined)
    this.validationMessage = "Password cannot be empty"

    confirm(this.validationMessage)
  }
  
}
