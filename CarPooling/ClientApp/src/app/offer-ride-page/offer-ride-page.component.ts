import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
} from '@angular/forms';
import { Router } from '@angular/router';
import { OfferedRide } from 'src/models/offered-ride';
import { User } from 'src/models/user';
import { RideServiceService } from '../services/RideService.service';

@Component({
  selector: 'app-offer-ride-page',
  templateUrl: './offer-ride-page.component.html',
  styleUrls: ['./offer-ride-page.component.css'],
})
export class OfferRidePageComponent implements OnInit {
  constructor(private fb: FormBuilder, private route: Router, private rideService: RideServiceService) { }

  // Current User Who is Logged in 
  activeUser!: User;
  // Status dealing with the visibility of the Second Card
  status: boolean = false;
  // Variable To Hold the Current Date 
  currentDate!: string

  // Boolean value which controls the Visibility of the Sucess Message
  responseMessage:boolean=false;

  // Deals with the Status of the Submitted Offer Ride Request 
  requestSubmitStatus: boolean = false

  // Code Dealing with Forms and Form Initializations
  firstForm!: FormGroup
  secondForm = this.fb.group({
    stop1: [''],
    stop2: [''],
    stop3: [''],
    vacancy: [' ', Validators.required],
    price: ['', Validators.required],
    allstops: this.fb.array([]),
  });


  ngOnInit(): void {
    this.FormatDate()
    //Getting the User  data from local Storage 
    this.activeUser = JSON.parse(String(localStorage.getItem('user')));
    // Setting The current Active UserName
    // Validations For the First Form
    this.firstForm = this.fb.group({
      source: ['', Validators.required],
      destination: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
    });
  }


  // Gets Triggered when the Next>> Icon is clicked , will Make the Second Card
  Next() {
    this.status = true;
  }

  // Adds a new stop by pushing the control to the Form Array
  addNewStop() {
    const control = new FormControl('', Validators.required);
    (<FormArray>this.secondForm.get('allstops')).push(control);
  }
  allstopss: any = (<FormArray>this.secondForm.get('allstops')).value;
  get allstops() {
    return (<FormArray>this.secondForm.get('allstops')).controls;
  }


  

  // Method Dealing with the Offer Ride Request and forwarding it 
  OfferRideRequestSubmit() {
  
    let stops:string=""
    let noOfSlots:number=0
    if(this.secondForm.get('stop1')?.value!=""){
      stops = this.secondForm.get('stop1')?.value!;
      noOfSlots+=1
    }
    if(this.secondForm.get('stop2')?.value!=""){
      stops = stops + "." + this.secondForm.get('stop2')?.value
      noOfSlots+=1
    }
    if(this.secondForm.get('stop3')?.value!=""){
      stops = stops + "." + this.secondForm.get('stop3')?.value
      noOfSlots+=1
    }

   

    let intermediateStops: FormArray = this.secondForm.get('allstops')?.value as unknown as FormArray;

    for (let i = 0; i < intermediateStops.length; i++) {
      stops += "." + this.secondForm.get("allstops." + i)?.value;
      noOfSlots+=1
    }

    let avaliableslots: string = this.secondForm.get("vacancy")?.value?.toString()!
    for (let i = 1; i < noOfSlots+1; i++) {
      
      avaliableslots += "." + this.secondForm.get("vacancy")?.value?.toString()!
     
    }

    // Creating the OfferRide Object and assigning the Values
    let offerRideRequest: OfferedRide = {
      rideId: 0,
      startPoint: this.firstForm.get('source')?.value,
      endPoint: this.firstForm.get('destination')?.value,
      date: this.firstForm.get('date')?.value,
      isActive: true,
      timeSlot: this.firstForm.get('time')?.value,
      intermediatePoints: stops,
      capacity: avaliableslots,
      farePerBlock: Number(this.secondForm.get("price")?.value),
      offererName: this.activeUser.userName,
      offererId: 0
    };

    // Calling the Service
    this.rideService.UserOfferRide(this.activeUser.userId!, offerRideRequest).subscribe((data) => {
      this.firstForm.reset();
      this.secondForm.reset();
      this.status=false;
      this.responseMessage=true
      this.requestSubmitStatus = data.response
      
    });
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
}
