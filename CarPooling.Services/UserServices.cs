using CarpoolingContracts;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace CarPooling_Services
{
     public class UserServices : IUser
     {
         private readonly DatabaseContext _dbContext;

        

        private readonly IConfiguration _configuration;
        public UserServices( DatabaseContext databaseContext, IConfiguration configuration) 
        {
            this._dbContext = databaseContext;
            this._configuration=configuration;
        }

        //Method to Carry Out the User Login
        public   async  Task<User> UserLogin(string userEmailId, string password)
        {
            try
            {
                var user =  _dbContext.Users.Where(n => n.Email == userEmailId && n.Password == password).FirstOrDefault();

                if (user == null)
                {
                    throw new Exception("Could not Find Your details");
                }
                 string token = CreateToken(user);
               
                // Returning the Token 
                user.Password = token;
                return user;
            }catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception(ex.Source);
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

                    
                        _dbContext.Users.Add(newUser);
                        await _dbContext.SaveChangesAsync();
                        return true;
                    
                    
                }
                return false;
            }catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception(ex.Source);
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
                
                    newUserInfo.UserName = newUserDetails.UserName;
                    newUserInfo.Password = newUserDetails.Password;
                    newUserInfo.Email = newUserDetails.Email;
                    newUserInfo.PhoneNumber = newUserDetails.PhoneNumber;
                    await _dbContext.SaveChangesAsync();
                    return true;
                
                
            }catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception(ex.Source);
            }
        }

        // Creating The Token with the Help Of This Method

        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name,user.UserName),
                //  new Claim(ClaimTypes.Role,"Noob")

            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Key").Value));

            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: cred);
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }

    }
}
