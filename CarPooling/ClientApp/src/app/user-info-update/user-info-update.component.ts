import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/models/user';
import { UserService } from '../services/UserService.service';

@Component({
  selector: 'app-user-info-update',
  templateUrl: './user-info-update.component.html',
  styleUrls: ['./user-info-update.component.css'],
})
export class UserInfoUpdateComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private userService: UserService
  ) {}

  activeUser!: User;
  sucessstatus: boolean = false;
  userInfoForm!: FormGroup;

  ngOnInit(): void {
    this.activeUser = JSON.parse(String(localStorage.getItem('user')));
    this.userInfoForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmpassword: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      phonenumber: ['',[ Validators.required, Validators.minLength(10)]],
    });
  }

 

  UpdateInfo() {
    let newuser: User = {
      userName: this.userInfoForm.get('username')?.value,
      password: this.userInfoForm.get('password')?.value,
      phoneNumber: this.userInfoForm.get('phonenumber')?.value.toString(),
      email: this.userInfoForm.get('email')?.value,
    };
    this.userService
      .UserUpdateProfile(newuser, this.activeUser.userId!)
      .subscribe((data) => {
        this.sucessstatus = data.response;
        console.log(this.sucessstatus);
      });
  }
}
