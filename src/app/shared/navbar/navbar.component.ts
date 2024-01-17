import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core'
import { AuthServiceService } from 'src/app/services/auth-service.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private translateservice:TranslateService, private authservice:AuthServiceService){
    this.translateservice.setDefaultLang('ar')
  }
  logo:string="./assets/img/ksu_logo_out.png"
  logout():void{
    this.authservice.logOut();
  }
}
