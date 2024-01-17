import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  signUpForm: FormGroup;
  submittingForm: boolean = false;

  constructor(private translateservice:TranslateService, private formB:FormBuilder ,
    private authservice:AuthServiceService,  private router: Router){

    this.translateservice.setDefaultLang('ar');

    this.signUpForm=this.formB.group({
      fullName: ['', [Validators.required]],
      email: ['', [ Validators.required,
                    Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$') 
                  ]
              ],      
      password: ['', [Validators.required, Validators.minLength(6), this.strongPasswordValidator]]
    });
  }
 
  //signUp function with alert 
  SignUp(): void{
    if (this.signUpForm.valid) {
      this.submittingForm = true;
      const formData = this.signUpForm.value;
      this.authservice.signUp(formData).subscribe(
        (response)=>{
          
          console.log('Inscription réussie ! Réponse du serveur :', response);
        
          this.submittingForm=false;
          Swal.fire({
            icon: 'success',
            title: ' تم التسجيل بنجاح!',
            text: 'يمكنك الآن تسجيل الدخول.',
            confirmButtonText: 'موافق',
            confirmButtonColor: "green"
          });
          this.router.navigateByUrl('/login');
        },
        (error)=>{
          if(error.status == 500){
          this.submittingForm = false;
          console.log("erreur d'enregistrement", error);
          Swal.fire({
            icon: 'error',
            title: ' فشل التسجيل! ',
            text: 'المستخدم موجود بالفعل.',
            confirmButtonColor: "red",
            confirmButtonText: 'موافق',


          });
        }
        }
      )
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
  
}
