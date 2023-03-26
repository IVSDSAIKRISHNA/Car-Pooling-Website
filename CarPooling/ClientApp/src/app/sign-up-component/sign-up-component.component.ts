import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { UserService } from '../services/UserService.service';
import { Router } from '@angular/router';
import { ResponseBase } from 'src/models/response-base';
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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmpassword: ['', [Validators.required, Validators.minLength(8)]],
    });
  }



  signupStatus: boolean = false;
  apiResponse!: ResponseBase;
  responseStatus:boolean=false;

  onSubmit() {
    let confirmpassword = this.signupForm.get('confirmpassword')?.value;
    let temp = String(this.signupForm.get('email')?.value).split('@');

    let newUser:User={
      email:this.signupForm.get('email')?.value,
      password:this.signupForm.get('password')?.value,
      userName:temp[0],
      phoneNumber:''
    }
    if (newUser.password !== confirmpassword) {
      this.signupStatus = false;
    } else {
      this.api.UserRegistration(newUser).subscribe((data) => {
        this.apiResponse = data;
        this.signupStatus = this.apiResponse.response;
        this.responseStatus=true;
        if (this.signupStatus) {
          this.router.navigate(['/home']);
        }
      });
    }

    this.signupForm.reset();
  }

  onClick(){
    this.responseStatus=false;
  }
}
