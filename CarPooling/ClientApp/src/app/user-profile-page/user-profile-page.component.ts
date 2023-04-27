import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookRide } from 'src/models/book-ride';
import { OfferedRide } from 'src/models/offered-ride';
import { User } from 'src/models/user';
import * as Notiflix from 'notiflix';

import { RideServiceService } from '../services/RideService.service';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.css']
})
export class UserProfilePageComponent implements OnInit {

  constructor(
    private rideService: RideServiceService,
    private route: Router
  ) {
    this.activeUser = JSON.parse(localStorage.getItem("user")!);
  }

  //Arrays of Previously Offered Rides and Booked Rides
  PreviouslyOfferedRides!: OfferedRide[]
  PreviouslyBookedRides!: BookRide[]
  activeUser!: User;
  offeredRidesCount: boolean = false
  bookRidesCount: boolean = false


  ngOnInit(): void {
    //Getting the Previously Booked Rides
    this.rideService.GetBookedRide(this.activeUser.userId!).subscribe((data) => {
      this.PreviouslyBookedRides = data.response;
      if (this.PreviouslyBookedRides == null) {
        this.bookRidesCount = true;
      }
    })

    // Getting the Previously Offered Rides
    this.rideService.GetOfferedRide(this.activeUser.userId!).subscribe((data) => {
      this.PreviouslyOfferedRides = data.response;
      if (this.PreviouslyOfferedRides == null) {
        this.offeredRidesCount = true;
      }
     
    })
  }

  
  // Method which Logs out the user and clears the Local Storage
  Logout() {
    Notiflix.Loading.dots("Logging you out ")
    localStorage.clear();
    Notiflix.Loading.remove(3000)
  }



}
