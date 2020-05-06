import { Component, OnInit, Input } from '@angular/core';
import {User} from '../user';
import {UserService} from '../user.service';
import {UserModalComponent } from '../user-modal/user-modal.component';
import {MatDialog} from '@angular/material/dialog';
import { ThemeService } from '../theme.service';
import { HomepageComponent } from '../homepage/homepage.component';
import {LoginService} from '../login.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  
  user = new User();
  
  projectReturn: number;
  LoginId: number
  theme:string;
  
  constructor(private userService:UserService, public dialog: MatDialog, private themeService: ThemeService, public loginService:LoginService) {}
  
  
  ngOnInit(): void {
    this.projectReturn;
    this.LoginId;
  }
  
  //if register button has been pressed
  newUser() {
    this.theme = this.themeService.currentActive();
    const dialogRef = this.dialog.open(UserModalComponent, {
      width: '50%',
      data:{user: this.user, origin: "register"},
      panelClass: this.theme,
    });
    
    dialogRef.afterClosed().subscribe(result=>{
      this.userService.save(result).subscribe();
      this.userService.login(result).subscribe(answer=>{
        this.projectReturn = answer;
        this.LoginId = this.projectReturn;
        this.loginService.globalLoginId = this.LoginId; 
        this.loginService.setLogin();
        console.log("loginID = " + this.loginService.globalLoginId);
      });
    })
  }
  
  //if login button has been pressed.
  loginUser() {
    this.theme = this.themeService.currentActive();
    const dialogRef = this.dialog.open(UserModalComponent, {
      width: '50%',
      data:{user: this.user, origin: "login"},
      panelClass: this.theme,
    });
    
    dialogRef.afterClosed().subscribe(result=>{
      this.userService.login(result).subscribe(answer=>{
        this.projectReturn = answer;
        this.LoginId = this.projectReturn;
        this.loginService.globalLoginId = this.LoginId;
        this.loginService.setLogin(); 
        console.log("loginID = " + this.loginService.globalLoginId);
      });
    })
    
  }
  
  
  
}
