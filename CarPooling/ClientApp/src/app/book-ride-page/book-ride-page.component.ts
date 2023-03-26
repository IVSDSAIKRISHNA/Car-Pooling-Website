import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookRide } from '../../models/book-ride';
import { RideServiceService } from '../services/RideService.service';
import { Router } from '@angular/router';
import { ResponseBase } from 'src/models/response-base';
import { User } from 'src/models/user';
import { OfferedRide } from 'src/models/offered-ride';

@Component({
  selector: 'app-book-ride-page',
  templateUrl: './book-ride-page.component.html',
  styleUrls: ['./book-ride-page.component.css']
})
export class BookRidePageComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private rideService: RideServiceService,
    private route:Router
  ) {}

  //Reactive Form for the Form Group
  bookRideForm!: FormGroup;
  // Information of the Current User who is Logged in
  activeUser!: User;
  // Current date to set the minimum Date in the Form
  currentDate!: string



  matchedRideStatus:boolean = true
  responseStatus:boolean=false
  successStatus:boolean=false  

  ngOnInit(): void {
      //Initialising the Date
    this.FormatDate()
    // Getting the Data from Local Storage And Assigning it to the Variable
    this.activeUser = JSON.parse(localStorage.getItem("user")!);

    this.activeUser=JSON.parse(String(localStorage.getItem("user")));
    
    // Adding Various Form Validations
    this.bookRideForm = this.fb.group({
      source: ['', Validators.required],
      destination: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required]
    });
  }

  // Empty Book Ride Request
  bookRideRequest: BookRide =
    {
      startPoint: '',
      endPoint: '',
      date: '',
      isActive: false,
      timeSlot: '',
      bookerUserId: 0
    }

    // Array of All The Matched Rides 
  allMatchedRides?: OfferedRide[]

  bookedRide?:BookRide

  //Function which gets triggered Upon Submitting the Form, This method makes the Http Call using service  and Registers the Request To The Server
  BookRideFromSubmission() {
    this.bookRideRequest.startPoint = this.bookRideForm.get('source')?.value;
    this.bookRideRequest.endPoint = this.bookRideForm.get('destination')?.value;
    this.bookRideRequest.date = this.bookRideForm.get('date')?.value;
    this.bookRideRequest.isActive = true;
    this.bookRideRequest.timeSlot = this.bookRideForm.get('time')?.value;
    this.bookRideRequest.bookerUserId = this.activeUser.userId;
    this.rideService.UserBookRide(this.activeUser.userId!, this.bookRideRequest).subscribe((data) => {
      if (data.response == true) {
        console.log("Request Submitted Sucessfully");
      } else {
        console.log("Sorry Could not Register Your Request")
      }
      this.FindallMatchedRides()
    });
    this.bookRideForm.reset();
  }

  // Method to Find All the Matching Rides with respect to the Current Request 
  FindallMatchedRides() {
    this.rideService.MatchedRides(this.bookRideRequest).subscribe((data) => {
      this.allMatchedRides = data.response
      console.table(this.allMatchedRides)
      if(this.allMatchedRides==null){
        this.matchedRideStatus=false
      }
    });
  }

  
  onClick(){
    this.matchedRideStatus=true
  }

  // Method to Format the date into the Required Format
  FormatDate() {
    let currentTime = new Date();
    let day = currentTime.getDate();
    let currentDate
    if (String(day).length < 2) {
      currentDate = `0${day}`
    } else {
      currentDate = day
    }
    let month = currentTime.getMonth() + 1;
    let currentMonth
    if (String(month).length < 2) {
      currentMonth = `0${month}`
    }
    else {
      currentMonth = month
    }
    let year = currentTime.getFullYear();

    this.currentDate = `${year}-${currentMonth}-${currentDate}`;

  }


 


 

  BookRide(selectedRideId:number){
    this.rideService.ConfirmRide(selectedRideId,this.bookRideRequest).subscribe((data)=>{
     this.bookedRide=data.response
     console.log(this.bookedRide)   
     this.successStatus=true;
     this.responseStatus=true;
     });
  }

}
