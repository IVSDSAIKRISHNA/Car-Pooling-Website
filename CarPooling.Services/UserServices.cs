using CarpoolingContracts;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarPooling_Services
{
     public class UserServices : IUser
    {
         private readonly DatabaseContext _dbContext;
        public UserServices( DatabaseContext databaseContext) 
        {
            this._dbContext = databaseContext;
        }

        //Method to Carry Out the User Login
        public async  Task<User> UserLogin(string userEmailId, string password)
        {
            try
            {
                var user = _dbContext.Users.Where(n => n.Email == userEmailId && n.Password == password).FirstOrDefault();

                if (user == null)
                {
                    throw new Exception("Could not Find Your details");
                }
                return user;
            }catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw ex;
            }
        }

        
        // Method to Register a New User 
        public async Task<bool> UserRegistration(User newUser)
        {
            try
            {
                var user = _dbContext.Users.Where(n => n.Email == newUser.Email).FirstOrDefault();
                if (user == null)
                {

                    try
                    {
                        _dbContext.Users.Add(newUser);
                        await _dbContext.SaveChangesAsync();
                        return true;
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex.ToString());
                        throw ex;
                    }
                }
                return false;
            }catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw ex;
            }
           
        }


        // Method to Update the Profile
        public async Task<bool> UserUpdateProfile(User newUserDetails, int userId)
        {
            try
            {
                var newUserInfo = await _dbContext.Users.FindAsync(userId);

                if (newUserInfo == null)
                {
                    return false;
                }
                try
                {
                    newUserInfo.UserName = newUserDetails.UserName;
                    newUserInfo.Password = newUserDetails.Password;
                    newUserInfo.Email = newUserDetails.Email;
                    newUserInfo.PhoneNumber = newUserDetails.PhoneNumber;
                    await _dbContext.SaveChangesAsync();
                    return true;
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.ToString());
                    throw ex;
                }
            }catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw ex;
            }
        }
    }
}
