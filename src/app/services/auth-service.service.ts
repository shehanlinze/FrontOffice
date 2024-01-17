import { Injectable, StaticProvider } from '@angular/core';
import { Observable } from 'rxjs';
import { Staff } from '../models/Staff';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environements/environment';
import { UserLoginReq } from './UserLoginReq';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPassword } from './ResetPassword';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
private baseUrl=environment.backendUrl;
private helper = new JwtHelperService(); 

  constructor(private httpclient:HttpClient, private router:Router,private route:ActivatedRoute) { }

  //signUp function with API backEnd
  signUp(userSignup: Staff): Observable<any> {
    return this.httpclient.post(`${this.baseUrl}/staff/register`, userSignup, {
      responseType: 'text',
    });
  }

 // login function 
 login(loginReq: UserLoginReq): Observable<any> {
  return this.httpclient.post<{ token: string }>(`${this.baseUrl}/staff/login`,loginReq ,{
    observe: 'response',
  });
}

decodeJWT(): void {
  let token: any = localStorage.getItem('token');
  if (token) {
    const decodedToken = this.helper.decodeToken(token);
    console.log("lll", decodedToken);
  }
}

getToken(): any {
  return localStorage.getItem('token');
}

logOut(): void {
  localStorage.removeItem('token');
  localStorage.removeItem('isLogged')
  this.router.navigateByUrl('/login')
window.location.reload()
}

//forgot password
forgotPassword(email: string):Observable<any>{
  return this.httpclient.post(`${this.baseUrl}/staff/forgotPassword`,{email},{
    observe: 'response', });  
}
//reset password 
resetPassword( resetpassword:ResetPassword): Observable<any> {
  console.log("user fff", resetpassword)
  return this.httpclient.put(`${this.baseUrl}/staff/resetpassword`,resetpassword);


}


}