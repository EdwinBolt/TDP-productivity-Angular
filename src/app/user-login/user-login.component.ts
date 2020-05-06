import { Component, OnInit, Input } from '@angular/core';
import {User} from '../user';
import {UserService} from '../user.service';
import {UserModalComponent } from '../user-modal/user-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ThemeService } from '../theme.service';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  
  user = new User();

  theme:string;

  constructor(private userService:UserService, public dialog: MatDialog, private snackBar: MatSnackBar, private themeService: ThemeService) { }
  
  projectReturn: number;

  @Input()
  appGlobal2:AppComponent
  

  ngOnInit(): void {
    this.projectReturn;
  }
  
  wrongPasswordSnackbar(message: string) {
    this.snackBar.open(message, "Dismiss", {
      duration: 2000,
    });
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
      this.userService.login(result).subscribe(projectReturn=> this.projectReturn = projectReturn);
      
      //console.log("returned id = " + this.projectReturn);
      
    this.appGlobal2.LoginId = this.projectReturn;
      
    })
    
  }
  
  
  
}
