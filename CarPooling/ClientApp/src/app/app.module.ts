import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeLogoComponentComponent } from './home-logo-component/home-logo-component.component';
import { SignUpComponentComponent } from './sign-up-component/sign-up-component.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { AppRoutingModule } from './app.routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { BookRidePageComponent } from './book-ride-page/book-ride-page.component';
import { UserProfilePageComponent } from './user-profile-page/user-profile-page.component';
import { OfferRidePageComponent } from './offer-ride-page/offer-ride-page.component';
import { UserInfoUpdateComponent } from './user-info-update/user-info-update.component';
import { TokeninterceptorService } from './interceptors/tokeninterceptor.service';
import { AuthGuard } from './services/auth.guard';
import { Auth2Guard } from './services/auth2.guard';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import * as Notiflix from 'notiflix';


@NgModule({
  declarations: [
    AppComponent,
    HomeLogoComponentComponent,
    SignUpComponentComponent,
    LoginComponentComponent,
    HomePageComponent,
    BookRidePageComponent,
    UserProfilePageComponent,
    OfferRidePageComponent,
    UserInfoUpdateComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [AuthGuard, Auth2Guard, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokeninterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
