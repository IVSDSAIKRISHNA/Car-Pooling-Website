import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { UserService } from '../services/UserService.service';
import { Router } from '@angular/router';
import { ResponseBase } from 'src/models/response-base';
import { ToastrService } from 'ngx-toastr';
import * as Notiflix from 'notiflix';
@Component({
  selector: 'app-sign-up-component',
  templateUrl: './sign-up-component.component.html',
  styleUrls: ['./sign-up-component.component.css'],
})
export class SignUpComponentComponent implements OnInit {
  signupForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private api: UserService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmpassword: ['', [Validators.required, Validators.minLength(8)]],
    });
  }


  // Dealing with the Status of the Signup and its response
  signupStatus: boolean = false;
  responseStatus: boolean = false;

  // To Deal With the Data That we get form the http call
  apiResponse!: ResponseBase;

  // Method which gets triggereed upon submitting the Data and Sends it
  onSubmit() {
    Notiflix.Loading.dots("Registering");
    let confirmpassword = this.signupForm.get('confirmpassword')?.value;
    // Giving a temporary name based on the email id until the user changes it 
    let temp = String(this.signupForm.get('email')?.value).split('@');

    let newUser: User = {
      email: this.signupForm.get('email')?.value,
      password: this.signupForm.get('password')?.value,
      userName: temp[0],
      phoneNumber: ''
    }
    if (newUser.password !== confirmpassword) {
      this.signupStatus = false;
    } else {
      this.api.UserRegistration(newUser).subscribe((data) => {
        this.apiResponse = data;
        this.signupStatus = this.apiResponse.response;
        this.responseStatus = true;
        if (this.signupStatus) {
          this.router.navigate(['/home']);
        } else {
          this.toastr.error("User Already Exists", "", { timeOut: 2000 });
        }
      });
    }
    // Resetting the Form
    this.signupForm.reset();
    Notiflix.Loading.remove(3000);
  }

  //Changing the Response Status Upon Clicking on the Form
  onClick() {
    this.responseStatus = false;
  }
}
