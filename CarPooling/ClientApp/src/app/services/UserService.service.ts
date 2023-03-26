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

  commonUrl:string="https://localhost:7198/api/UserService/"
  // Calls Regarding the UserLogin, UserRegistration and User Update
  
  UserLogin(useremail:string,userpassword:string){
    var realurl=`${this.commonUrl}login/?userEmailId=${useremail}&password=${userpassword}`
    let queryParams = new HttpParams();
    queryParams = queryParams.append(useremail,1);
    queryParams=queryParams.append(userpassword,1);
    try{
    return this.http.get<ResponseBase>(
      realurl,{params:queryParams}
     )
    }catch(error){
      return 
    }

  }

  UserRegistration(newuser:User){
    var url=`${this.commonUrl}registration`
    return this.http.post<ResponseBase>(url,newuser);
  }

  UserUpdateProfile(newUserDetails:User, userid:number){
    var url=`${this.commonUrl}userinfoupdate?userId=${userid}`
    return this.http.put<ResponseBase>(url,JSON.stringify((newUserDetails)),{ headers: new HttpHeaders({'Content-Type': 'application/json'})});
  }
  
}
