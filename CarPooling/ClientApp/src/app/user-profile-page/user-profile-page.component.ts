import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookRide } from 'src/models/book-ride';
import { OfferedRide } from 'src/models/offered-ride';
import { User } from 'src/models/user';
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

  PreviouslyOfferedRides!: OfferedRide[]
  PreviouslyBookedRides!: BookRide[]
  activeUser!: User;
  

  offeredRidesCount:boolean=false


  ngOnInit(): void {
    this.rideService.GetBookedRide(this.activeUser.userId!).subscribe((data) => {
      this.PreviouslyBookedRides = data.response;
      console.table(this.PreviouslyBookedRides);
      if(this.PreviouslyBookedRides.length==0){
        this.bookRidesCount=true;
      }
    })

    this.rideService.GetOfferedRide(this.activeUser.userId!).subscribe((data) => {
      this.PreviouslyOfferedRides = data.response;
      if(this.PreviouslyOfferedRides.length==0){
        this.offeredRidesCount=true;
      }
    })
  }

 bookRidesCount:boolean=false

 

}
