import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResponseBase } from 'src/models/response-base';
import { User } from 'src/models/user';
import { UserService } from '../services/UserService.service';
import { ToastrService } from 'ngx-toastr';
import * as Notiflix from 'notiflix';



@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})

export class LoginComponentComponent implements OnInit {

  //Form Group For the Form
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder,
    private api: UserService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  // Used to Deal with the Response that we get from the HTTP call
  apiResponse!: ResponseBase;


  // Gets triggered when the Details are Invalid , that is if the User Dosent exist in our Database
  invalidDetails: boolean = false;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
    this.VisibilityToggle();
  }

  // Deals with the Current Logged in user 
  loggedInUser!: User;

  // Used to toggle between the visibility of the password 
  hide: boolean = false;
  VisibilityToggle() {
    this.hide = !this.hide;
  }

  // gets Triggered  When Form is Submitted and calls the concerned service 
  onSubmit() {
    Notiflix.Loading.dots("Logging In");
    let user: User = {
      userName: " ",
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
      phoneNumber: ""
    }
    try {
      this.api.UserLogin(user)!.subscribe((data) => {
        this.loggedInUser = data.response;
        if (data.response == null) {
          console.log("Email or PassWord is Incorrect Try Again!!!")
          this.invalidDetails = true
        }
        localStorage.setItem("user", JSON.stringify(this.loggedInUser))
        localStorage.setItem("token", JSON.stringify(this.loggedInUser.password))
        if (data.errorMessage == null) {
          this.toastr.success('Login Successful ');
          this.router.navigate(['/home'])
        }
      });
      this.loginForm.reset();
    } catch (e) {
      console.log("Something Went Wrong Please Try Again")
    }
    Notiflix.Loading.remove(3000);
  }

  // Deals with the visibility of the Warning
  onClick() {
    this.invalidDetails = false
  }

}
