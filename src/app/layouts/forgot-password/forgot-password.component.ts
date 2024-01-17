import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  submitted :boolean = false;

  constructor(private translateService:TranslateService,private authservice:AuthServiceService,private router:Router,
    private formbuilder:FormBuilder){
    this.translateService.setDefaultLang('ar')

    this.forgotPasswordForm=this.formbuilder.group({
      email:['']
    });
  }

  forgotPasse(): void {
    this.submitted = true;
    if(this.forgotPasswordForm.invalid){
      return;
    }
      const email=this.forgotPasswordForm.value.email;
      this.authservice.forgotPassword(email).subscribe({
      next: (data) => {
        console.log('data forget Password', data);
        if (data)
          Swal.fire({
            title: '  تفقد بريدك الالكتروني  !',
            text: 'لقد تم إرسال رابط  الى بريدك الإلكتروني لتغير كلمة السرّ الخاصة بك.',
            icon: 'success',
            confirmButtonColor: '#2ECC71',
            confirmButtonText: 'حسنًا',
          });
      },
      error: (err) => {
        console.log('pfff', err);
        if (err.status == 400) {
          Swal.fire({
            title: 'خطأ',
            text: 'البريد الإلكتروني غير موجود!!!',
            icon: 'error',
            confirmButtonText: 'حسنًا',
            confirmButtonColor: '#E74C3C',
          });
        }
        if (err.status == 500) {
          Swal.fire({
            title: 'خطأ',
            text: 'خطأ أثناء إرسال الرسالة إلى بريدك الإلكتروني !!!',
            icon: 'error',
            confirmButtonText: 'حسنًا',
            confirmButtonColor: '#E74C3C',
          });
        }
      
      }
    });
  }

  ngOnInit():void{
    if (localStorage.getItem('isLogged'))
    this.router.navigateByUrl('/classes');
}

//   event.preventDefault() pour Annuler le comportement par défaut du formulaire
onReset(event:Event): void {
  event.preventDefault()
  this.submitted = false;
  this.forgotPasswordForm.reset();
}
  
}
