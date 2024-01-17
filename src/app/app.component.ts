import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  title = 'edu';
  isLogged: boolean = localStorage.getItem('isLogged') === 'true';

  constructor( ) {}

  ngOnInit(): void { 
 }

}
