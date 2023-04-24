import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models/user';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(
    private route: Router
  ) {

  }
  //Current logged in user
  activeUser!: User

  ngOnInit(): void {
    this.activeUser = JSON.parse(String(localStorage.getItem("user")));
  }

  //Gets triggerd when the user Clicks on Logout, the page gets Re Routed and the Local Storage is Cleared
  Logout() {
    localStorage.clear();
  }
}
