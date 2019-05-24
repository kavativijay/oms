import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { LoadingService } from 'src/app/service/loading.service';
import { AuthService } from 'src/app/service/security/auth.service';
import { AlertService } from 'src/app/service/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  formuser: FormGroup;
  ShowPage: boolean = false; 
  @ViewChild('close') close: ElementRef;
  forgotPassword:FormGroup;
  constructor(private fb: FormBuilder , private auth :AuthService , private loadingService:LoadingService,
      private router:Router,private dialog: MatDialog, private alertService:AlertService
    ) {
      debugger  
      this.loadingService.show();
      this.checkAuthUser();
    }

  ngOnInit() {
    this.formuser = this.fb.group({
     username: ['', Validators.email],
     password: ['',  Validators.required]
     
   })
   this.forgotPassword = this.fb.group({
    forgotemail:["",Validators.email]
   })
  }
  ngOnDestroy(): void {

  }
  signIn()
  {
    this.loadingService.show();
   
    const username = this.formuser.get('username').value;
    const password =this.formuser.get('password').value;

    if(username == "") return;
    this.auth.userSignIn(username,password,this.onSucess.bind(this),this.onError.bind(this));
    
   
  }
  onSucess(){
    debugger
    this.loadingService.hide();
    this.router.navigate(['/ordersPage'])
  }
  onError(ex)
  { 
    debugger
    
    this.loadingService.hide(); 
    //var data = {title:Strings.Login_Failed_Title,message:Strings.Login_Failed_Message}
    this.alertService.ShowFailedToast(ex.message);
    this.formuser = this.fb.group({
      username: ['', Validators.required],
      password: ['',  Validators.required]
      
    })
  }
   
  onKeydown(event) {
    if (event.key === "Enter") {
      this.signIn();
      return false;
    }
  }
  forgot_click()
  {
    this.closePopUp();
    this.loadingService.show();
    this.auth.SendPasswordResetEmail(this.forgotPassword.get('forgotemail').value,this.SendForgotEmailAction.bind(this));
  }
  SendForgotEmailAction(isSucess)
  {
    this.loadingService.hide();
    if(isSucess){
      // this.alertService.ShowSuccessToast(Strings.Reset_Password_Success);
    }
    else{
      // this.alertService.ShowFailedToast(Strings.Email_Failed);
    }
  }
  
  closePopUp() {
    let el: HTMLElement = this.close.nativeElement as HTMLElement;
    el.click();
  }

  async checkAuthUser(){
    const user = await this.auth.isLoggedIn();
    
    this.loadingService.hide();
    if (user) {
    this.router.navigate(['/login'])
    } else {
     this.ShowPage = true;
   }
  }
 

}

