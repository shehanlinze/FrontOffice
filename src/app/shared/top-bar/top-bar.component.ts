import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core'
@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  constructor(private translateservice:TranslateService){
    this.translateservice.setDefaultLang('ar')
  }
  ngOnInit(): void {
  }

}
