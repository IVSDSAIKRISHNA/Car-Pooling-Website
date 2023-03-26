import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResponseBase } from 'src/models/response-base';
import { User } from 'src/models/user';
import { UserService } from '../services/UserService.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})

export class LoginComponentComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder,
    private api: UserService,
    private router: Router
  ) { }

  apiResponse!: ResponseBase;
  invalidDetails: boolean = false;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  loggedInUser!: User;

  onSubmit() {
    let useremail = this.loginForm.get('email')?.value;
    let userpassword = this.loginForm.get('password')?.value;
    try {
      this.api.UserLogin(useremail, userpassword)!.subscribe((data) => {
        this.loggedInUser = data.response;
        if(data.response ==null){
           console.log("Email or PassWord is Incorrect Try Again!!!")
          this.invalidDetails = true
        }
        localStorage.setItem("user", JSON.stringify(this.loggedInUser))
        if (data.errorMessage == "Login Successful!") {
          this.router.navigate(['/home'])
        }
      });
      this.loginForm.reset();
    } catch (e) {
      console.log("Something Went Wrong Please Try Again")
    }
  }

  onClick() {
    this.invalidDetails = false
  }

}
