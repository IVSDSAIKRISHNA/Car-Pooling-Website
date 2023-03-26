import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BookRide } from '../../models/book-ride';
import { OfferedRide } from '../../models/offered-ride';
import { ResponseBase } from 'src/models/response-base';

@Injectable({
  providedIn: 'root'
})
export class RideServiceService {

  constructor(private http:HttpClient) { }
   
  commonUrl:string="https://localhost:7198/api/RideService/"
  
  // Calls Dealing with the Rides 

  // Getting the  Previously Booked Rides of the User Based on the User Id 
  GetBookedRide(userId:number){
    var url=`${this.commonUrl}bookedrides?userId=${userId}`
    let queryParams = new HttpParams();
    queryParams = queryParams.append(String(userId),1)
    return this.http.get<ResponseBase>(url,{params:queryParams});
  }

  // Booking and Confirming the Ride After User Selects One Of the Matched Rides
  ConfirmRide(selectedRideId:number,bookRideRequest:BookRide){
    var url=`${this.commonUrl}rideid?rideId=${selectedRideId}`
    return this.http.post<ResponseBase>(url,JSON.stringify((bookRideRequest)),{ headers: new HttpHeaders({'Content-Type': 'application/json'})})
  }


  // Getting the Previously Offered Rides of the User Based On his User Id
  GetOfferedRide(userId:number){
    var url=`${this.commonUrl}offeredrides?userId=${userId}`
    let queryParams = new HttpParams();
    queryParams = queryParams.append(String(userId),1)
    return this.http.get<ResponseBase>(url,{params:queryParams});
  }


  // Getting All The Matched Rides which Satisfy the Requriments of the Request 
  MatchedRides(bookRideInfo:BookRide){
    var url=`${this.commonUrl}matchedrides`
    return this.http.post<ResponseBase>(url,JSON.stringify((bookRideInfo)),{ headers: new HttpHeaders({'Content-Type': 'application/json'})});
  }


  // Method to Take a New BookRide Request From The User
  UserBookRide(userId:number,bookRideRequest:BookRide){
    var url=`${this.commonUrl}bookride?userId=${userId}`
    return this.http.post<ResponseBase>(url,JSON.stringify((bookRideRequest)),{ headers: new HttpHeaders({'Content-Type': 'application/json'})})
  }

  //Method to Take a New Offer Ride Request From the User
  UserOfferRide(userId:number,offerRiderequest:OfferedRide){
    var url=`${this.commonUrl}offerride?userId=${userId}`
    return this.http.post<ResponseBase>(url,JSON.stringify((offerRiderequest)),{ headers: new HttpHeaders({'Content-Type': 'application/json'})})
  }

 // https://localhost:7198/api/RideService/offerride?userId=18
}
