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
    private route:Router
  ) {
   }
   
  activeUser!: User
  
  ngOnInit(): void {
    this.activeUser=JSON.parse(String(localStorage.getItem("user")));
   
  }

 



}
