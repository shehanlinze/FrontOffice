import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TranslateService } from '@ngx-translate/core';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs/internal/Subject';
import { Class } from 'src/app/models/Class';
import { ClasseServiceService } from 'src/app/services/classe-service.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {
  classes: Class[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger!: Subject<ADTSettings>;
  private helper = new JwtHelperService();
  staffStatus=''

  constructor(private router:Router,
    private translateservice: TranslateService, private classeservice: ClasseServiceService) {
    this.translateservice.setDefaultLang('ar');
  }
  decodeJWT(token:any) {
    if (token) {
      const decodedToken = this.helper.decodeToken(token);
      console.log("lll", decodedToken);
      return decodedToken
    }
  }

  ngOnInit(): void {

    if(localStorage.getItem('isLogged')=='true'){
      const decoddedToken =this.decodeJWT(localStorage.getItem('token'))
console.log('decoded',decoddedToken.staffStatus)
this.staffStatus=decoddedToken.staffStatus
    // all the options for datatable
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthMenu: [5, 10, 25],
      processing: true,
      //update langage datatable 
      language: {
        url: './assets/i18n/arabic.json',
        searchPlaceholder: "أدخل اسم القاعة"
      },

      //get all classes with API 
      ajax: (dataTablesParameters: any, callback: any) => {
        this.classeservice.getAllClasses().subscribe((data: Class[]) => {
          callback({
            recordsTotal: data.length,
            recordsFiltered: data.length,
            data: data
          });
        });
      },
      
      //column and content of culumn datatable 
      columns: [
        { title: 'إسم القاعة ', data: 'name' },
        { title: 'اسم المبنى', data: 'building' },
        { 
          data: '_id',
          title: 'تفاصيل',
          render: function (data: any, type: any, full: any) {
            return '<a href="/classDetails/' + data + '"><i class="fa fa-info-circle"></i></a>';
          }
        }
      ]
    };
  }else{   this.router.navigateByUrl('/login')}
  }


}

