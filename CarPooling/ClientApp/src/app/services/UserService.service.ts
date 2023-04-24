import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponseBase } from '@angular/common/http';
import { User } from '../../models/user';
import { ResponseBase } from 'src/models/response-base';
import { Observable } from 'rxjs';
// import { BookRide } from '../../Models/book-ride';
// import { OfferedRide } from '../../Models/offered-ride';
// import { ResponseBase } from 'src/Models/response-base';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  // Common Url which is same for all the Calls
  //commonUrl:string="https://localhost:7198/api/UserService/"
  commonUrl:string="https://carpooling5-api.azurewebsites.net/api/UserService/"

  // Calls Regarding the UserLogin, UserRegistration and User Update
  // Deals with the User Login
  UserLogin(user :User ){
    var realurl=`${this.commonUrl}login`
    try{
    return this.http.post<ResponseBase>(realurl,JSON.stringify((user)),{ headers: new HttpHeaders({'Content-Type': 'application/json'})});
    }catch(error){
      return 
    }
  }

  // Deals with User Registration
  UserRegistration(newuser:User){
    var url=`${this.commonUrl}registration`
    return this.http.post<ResponseBase>(url,newuser);
  }

  // Updates the Profile of the already Existing User 
  UserUpdateProfile(newUserDetails:User, userid:number){
    var url=`${this.commonUrl}userinfoupdate?userId=${userid}`
    return this.http.put<ResponseBase>(url,JSON.stringify((newUserDetails)),{ headers: new HttpHeaders({'Content-Type': 'application/json'})});
  }
  
}
