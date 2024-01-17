import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ClassesComponent } from './layouts/classes/classes.component';
import { DetailsClassesComponent } from './layouts/details-classes/details-classes.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoginComponent } from './layouts/login/login.component';
import { RegisterComponent } from './layouts/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TopBarComponent } from './shared/top-bar/top-bar.component';
import { DataTablesModule } from 'angular-datatables';
import { ScrollStickyDirective } from 'src/scroll-sticky.directive';
import { ScrollToTopDirective } from 'src/scroll-to-top.directive';
import { JwtModule } from '@auth0/angular-jwt';
import { ForgotPasswordComponent } from './layouts/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './layouts/reset-password/reset-password.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UpdateDeviceComponent } from './layouts/update-device/update-device.component';
import { ModalModule } from 'ngx-bootstrap/modal'
export function httpTranslateLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ClassesComponent,
    DetailsClassesComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    TopBarComponent,
    ScrollStickyDirective,
    ScrollToTopDirective,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    NotFoundComponent,
    UpdateDeviceComponent,
  ],
  imports: [
    ModalModule.forRoot(),    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    DataTablesModule,
    ReactiveFormsModule,
    JwtModule,FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
