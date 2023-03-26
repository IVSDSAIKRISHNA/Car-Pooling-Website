using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models;

namespace CarpoolingContracts
{
     public  interface IUser
    {


        // Method used to Register a new User
        Task<bool> UserRegistration(User newUser);

        // Method used to authenticate the login details of the user 
        Task<User> UserLogin(string userEmailId, string password);   

        //Method to Update the User Details
        Task<bool> UserUpdateProfile(User newUserDetails, int userId);


       

     }
}
