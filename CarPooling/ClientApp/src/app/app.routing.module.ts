import {  NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";
import { BookRidePageComponent } from "./book-ride-page/book-ride-page.component";
import { HomeLogoComponentComponent } from "./home-logo-component/home-logo-component.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { LoginComponentComponent } from "./login-component/login-component.component";
import { OfferRidePageComponent } from "./offer-ride-page/offer-ride-page.component";
import { SignUpComponentComponent } from "./sign-up-component/sign-up-component.component";
import { UserInfoUpdateComponent } from "./user-info-update/user-info-update.component";
import { UserProfilePageComponent } from "./user-profile-page/user-profile-page.component";

const routes:Routes =[
    {path : 'user' , component: HomeLogoComponentComponent,
    children:[
        {path:'signup' , component:SignUpComponentComponent},
        {path:'login',component:LoginComponentComponent}
    ]
},
    {path :'login',component:LoginComponentComponent},
    {path:'signup',component:SignUpComponentComponent},
    {path:'home',component:HomePageComponent},
    {path:'profile',component:UserProfilePageComponent},
    {path:'offerride',component:OfferRidePageComponent},
    {path:"infoupdate",component:UserInfoUpdateComponent},
    {path:'',redirectTo:'user/signup',pathMatch:'full'},
    {path:'bookride',component:BookRidePageComponent},
    {path:'**', redirectTo:'user/signup',pathMatch:'full'},
    

    
];

@NgModule({
imports :[RouterModule.forRoot(routes)],
exports:[RouterModule]
})

export class AppRoutingModule{ }
