using CarpoolingContracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;
using System.Data;

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
            try
            {
                bool status = await _user.UserRegistration(newUser);
                if (status)
                {
                    return Ok(new ResponseBase<bool>()
                    {
                        Response = status,
                        ErrorMessage = null
                    });
                }
                return Ok(new ResponseBase<bool>()
                {
                    Response = status,
                    ErrorMessage = "Could Not Register  \n Please Try again after Sometime "
                }); 

            }
            catch(Exception ex)
            {
                return Ok(new ResponseBase<bool>()
                {
                    Response = false,
                    ErrorMessage = ex.Message

                }) ;
            }
        }

        //Method to Carry Out Login of the User 
        [HttpPost("login")]
        public async Task<ActionResult<ResponseBase<User>>> UserLogin(User user)
        { 

            try
            {
                User loggedInUser =  await  _user.UserLogin(user.Email,user.Password);
                return Ok(new ResponseBase<User>()
                {
                    Response = loggedInUser,
                    ErrorMessage = null
                });
            }
            catch(Exception ex)
            {
                return Ok(new ResponseBase<User>()
                {
                    Response = null,
                    ErrorMessage = ex.Message
                });
            }
        }


        //Method to Update the User Profile 
        [HttpPut("userinfoupdate")]
        [Authorize]
        public async Task<ActionResult<ResponseBase<bool>>> UserUpdateProfile(User newUserDetails,int userId)
        {
           
            try
            {
                bool updateStatus = await _user.UserUpdateProfile(newUserDetails, userId);
                if (updateStatus)
                {
                    return Ok(new ResponseBase<bool>()
                    {
                        Response = updateStatus,
                        ErrorMessage = null
                    });
                }
                return Ok(new ResponseBase<bool>()
                {
                    Response = updateStatus,
                    ErrorMessage = "Could Not Update Your Profile\n Please Try Again after some time"
                }); 

            }
            catch (Exception ex)
            {
                return Ok(new ResponseBase<bool>()
                {
                    Response = false,
                    ErrorMessage = ex.Message
                }) ; 
            }
        }


    }
}
