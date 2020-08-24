import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonService } from './common.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
public isLoginShow:boolean=true;
public isValidateShow:boolean=false;
public isSignUpShow:boolean=false;
public ngForm:NgForm;
public commonService:CommonService;
  constructor(){
}
// moveToSignUp(){
//   this.isLoginShow=false;
//   this.isSignUpShow=true;
// }
// moveToValidate(value:NgForm){
// this.isValidateShow = true;
// this.isSignUpShow=false;
// console.log(value);
// this.commonService.signUp();
// }
// login(){
// }
// validate(){
//   this.isLoginShow=true;
//   this.isValidateShow=false;
// }
}
