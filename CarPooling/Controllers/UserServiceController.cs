using CarpoolingContracts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace Car_Pooling.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserServiceController : ControllerBase
    {
       private readonly IUser _user;

        public UserServiceController(IUser user)
        {
            this._user = user;
        }


        //Method to Carry Out UserRegistration
        [HttpPost("registration")]
        public async Task<ActionResult<ResponseBase<bool>>> UserRegistration(User newUser)
        {   
            bool status = await _user.UserRegistration(newUser);
            if(status) 
            {
                return Ok(new ResponseBase<bool>() 
                {
                    Response=status,
                    ErrorMessage = "Registration Successfull"
                });
            }
            return Ok(new ResponseBase<bool>() 
            {
                Response=status,
                ErrorMessage = "Could Not Register  \n Please Try again after Sometime "
            });
        }

        //Method to Carry Out Login of the User 
        [HttpGet("login")]
        public async Task<ActionResult<ResponseBase<User>>> UserLogin(string userEmailId,string passWord)
        {
           
            User loggedInUser=await _user.UserLogin(userEmailId, passWord);
            if(loggedInUser!=null)
            {
                return Ok(new ResponseBase<User>()
                {
                    Response=loggedInUser,
                    ErrorMessage = "Login Successful!"
                });
            }
            return NotFound( new ResponseBase<User>() 
            {
                Response=loggedInUser,
                ErrorMessage="Email or Password is InCorrect \n Please Try Again"
            });
        }


        //Method to Update the User Profile 
        [HttpPut("userinfoupdate")]
        public async Task<ActionResult<ResponseBase<bool>>> UserUpdateProfile(User newUserDetails,int userId)
        {
            bool updateStatus= await _user.UserUpdateProfile(newUserDetails,userId);
            if (updateStatus)
            {
                return Ok(new ResponseBase<bool>()
                {
                    Response = updateStatus,
                    ErrorMessage = "Sucessfully Updated The Profile"
                });
            }
            return Ok(new ResponseBase<bool>()
            {
                Response = updateStatus,
                ErrorMessage="Could Not Update Your Profile\n Please Try Again after some time"
            });
        }


    }
}
