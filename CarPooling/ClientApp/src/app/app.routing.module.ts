import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { audit } from "rxjs";
import { BookRidePageComponent } from "./book-ride-page/book-ride-page.component";
import { HomeLogoComponentComponent } from "./home-logo-component/home-logo-component.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { LoginComponentComponent } from "./login-component/login-component.component";
import { OfferRidePageComponent } from "./offer-ride-page/offer-ride-page.component";
import { AuthGuard } from "./services/auth.guard";
import { SignUpComponentComponent } from "./sign-up-component/sign-up-component.component";
import { UserInfoUpdateComponent } from "./user-info-update/user-info-update.component";
import { UserProfilePageComponent } from "./user-profile-page/user-profile-page.component";
import { Auth2Guard } from "./services/auth2.guard";

const routes: Routes = [
    {
        path: 'user', component: HomeLogoComponentComponent,
        children: [
            { path: 'signup', component: SignUpComponentComponent },
            { path: 'login', component: LoginComponentComponent }
        ], canActivate: [Auth2Guard]
    },
    { path: 'login', component: LoginComponentComponent, canActivate: [Auth2Guard] },
    { path: 'signup', component: SignUpComponentComponent, canActivate: [Auth2Guard] },
    { path: 'home', component: HomePageComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: UserProfilePageComponent, canActivate: [AuthGuard] },
    { path: 'offerride', component: OfferRidePageComponent, canActivate: [AuthGuard] },
    { path: "infoupdate", component: UserInfoUpdateComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: 'user/login', pathMatch: 'full' },
    { path: 'bookride', component: BookRidePageComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: 'user/signup', pathMatch: 'full' },



];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
