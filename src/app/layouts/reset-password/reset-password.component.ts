import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import {  ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TranslateService } from '@ngx-translate/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  resetpasswordform !: FormGroup
  submittingForm :boolean = false;
  userEmail: any;
  decodedToken: any;
  token : any
  resetpassword: any;
  private helper= new JwtHelperService();
  constructor(private translateService:TranslateService, 
    private formBuilder:FormBuilder,
    private authService:AuthServiceService,
    private router:Router, private route:ActivatedRoute
    ){
    this.translateService.setDefaultLang('ar')
   
   this.resetpassword={
    password:'',
    email:''
   }
    
  }
  // decoded token 
  decodeJWT(token: any) {
    if (token) {
      const decodedToken = this.helper.decodeToken(token);
      console.log('token decoded', decodedToken);
      return decodedToken;
    }
  }
  //verify password format for user (validators password)
  strongPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.value;
      if (!/[A-Z]/.test(password)) {
      return { noUppercase: true };
    }
      if (!/[a-z]/.test(password)) {
      return { noLowercase: true };
    }
      if (!/[$@$!%*?&#]/.test(password)) {
      return { noSpecialCharacter: true };
    }
      if (password.length < 6) {
      return { minLength: true };
    }
    return null;
  }

  resetPassword(): void {
    if (this.resetpasswordform.valid) {
      this.submittingForm = true;
      this.resetpassword.password= this.resetpasswordform.get('password')!.value;
      this.resetpassword.email = this.userEmail
      console.log("resetpasss", this.resetpassword)
      this.authService.resetPassword(this.resetpassword).subscribe({
        next: (Data) => {
          if (Data) {
            console.log("dattta",Data)
            Swal.fire({
              title: 'تغيير كلمة السرّ !',
              text: 'لقد تمّ تغيير كلمة السّر بنجاح .',
              icon: 'success',
              confirmButtonColor: '#2ECC71',
              confirmButtonText: 'حسنًا',
            });
          }
        },
        error: (err) => {
          console.log("err", err);
          if (err.status === 400) {
            Swal.fire({
              title: 'خطأ',
              text: 'البريد الإلكتروني موجود من قبل !!!',
              icon: 'error',
              confirmButtonText: 'حسنًا',
              confirmButtonColor: '#E74C3C',
            });
          }
        }
      });
    }
  }
  

    ngOnInit():void{
      this.route.queryParams.subscribe((data) => {
        this.token = data['token'];
        console.log(this.token);
      });
      if(this.token){
      this.resetpasswordform=this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(6), this.strongPasswordValidator]],
      });
      console.log('tokkkken', this.token);
      this.decodedToken = this.decodeJWT(this.token);
      this.userEmail = this.decodedToken.email;
      console.log('userEmaaaaaail', this.userEmail);
      if (localStorage.getItem('isLogged'))
        this.router.navigateByUrl('/classes');
    }else{
      if( localStorage.getItem('isLoggedIn')){
      this.router.navigateByUrl("/classes")}else{
   } this.router.navigateByUrl("/login")}
  }}

