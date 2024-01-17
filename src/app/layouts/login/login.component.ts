import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import {TranslateService} from '@ngx-translate/core'
import { error } from 'jquery';
import { UserLoginReq } from 'src/app/services/UserLoginReq';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private helper = new JwtHelperService(); 

  loginForm:FormGroup;
  submittingForm: boolean = false;
  userLogin : UserLoginReq
  isLogged!: boolean;


  constructor(private translateservice:TranslateService,private router:Router,
     private formbuilder:FormBuilder,private authservice:AuthServiceService){ 
       this.translateservice.setDefaultLang('ar');

       this.loginForm=this.formbuilder.group({
        email:["",[Validators.required]],
        password:["",[Validators.required]]
       });
       this.userLogin={
        password :"",
        email:""
       }
}
ngOnInit(): void {
if(localStorage.getItem('isLogged')=='true')
this.router.navigateByUrl('/classes')
}

Login(): void {
  this.userLogin.email = this.loginForm.get('email')?.value;
  this.userLogin.password = this.loginForm.get('password')?.value;

  this.authservice.login(this.userLogin).subscribe(
    (data:any) => {
      this.authservice.decodeJWT();
      localStorage.removeItem('token');
      localStorage.setItem('token', data.body.token);
      localStorage.setItem('status', data.body.status);
      
      var status = localStorage.getItem('status');

      if (data.body.token != '' && data.body.token != null && status != 'notApprouved') { 
        localStorage.setItem('isLogged', 'true');
        this.router.navigateByUrl("/classes").then(() => {
          window.location.reload();
        });
      } else {
        localStorage.setItem('isLogged', 'false');
        this.router.navigateByUrl("/");
      }
    },
    (error) => {
      Swal.fire({
        icon: 'error',
        title: 'خطأ في تسجيل الدخول!',
        text: 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
        confirmButtonText: 'موافق',
      });
    }
  );
}


  
}
