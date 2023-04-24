using CarpoolingContracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace Car_Pooling.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class RideServiceController : ControllerBase
    {
        private readonly IRide _rides;
        public RideServiceController(IRide ride)
        {
            _rides = ride;
        }

        // Method Which Returns The Matched Rides that are Currently Active  With Respect to the BookRide

        [HttpPost("matchedrides"),Authorize]
        public async Task<ActionResult<ResponseBase<List<OfferedRide>>>> MatchedRides(BookRide bookRide)
        {
            try
            {

                List<OfferedRide> matchedRides = await _rides.MatchedRides(bookRide);
                if (matchedRides.Count == 0)
                {
                    return Ok(new ResponseBase<List<OfferedRide>>
                    {
                        Response = null,
                        ErrorMessage = "No Matching Rides \nPlease Try Again After Sometime"
                    });
                }
                return Ok(new ResponseBase<List<OfferedRide>>
                {
                    Response = matchedRides,
                    ErrorMessage = null
                });
            }catch(Exception ex)
            {
                return Ok(new ResponseBase<List<OfferedRide>>
                {
                    Response = null,
                    ErrorMessage =ex.Message
                });
            }
        }



        //Method Which Returns All the Previously Booked Rides by a User 

        [HttpGet("bookedrides"),Authorize]
        public async Task<ActionResult<List<BookRide>>> GetBookedRide(int userId)
        {
            try
            {
                List<BookRide> rideInfo = await _rides.GetBookedRide(userId);
                if (rideInfo.Count == 0)
                {
                    return Ok(new ResponseBase<List<BookRide>>
                    {
                        Response = null,
                        ErrorMessage = "You Have Not Offered any Rides Before "
                    });
                }
                return Ok(new ResponseBase<List<BookRide>>
                {
                    Response = rideInfo,
                    ErrorMessage = null
                });
            }catch (Exception ex)
            {
                return Ok(new ResponseBase<List<BookRide>>
                {
                    Response = null,
                    ErrorMessage = ex.Message
                }) ;
            }
        }


        // Method Which Returns All the Previously Offered Rides by a User
        [HttpGet("offeredrides"), Authorize]
        public async Task<ActionResult<ResponseBase<List<OfferedRide>>>> GetOfferedRide(int userId)
        {
            try
            {
                List<OfferedRide> rideInfo = await _rides.GetOfferedRide(userId);
                if (rideInfo.Count == 0)
                {
                    return Ok(new ResponseBase<List<OfferedRide>>
                    {
                        Response = null,
                        ErrorMessage = "You Have Not Offered any Rides Before "
                    });
                }
                return Ok(new ResponseBase<List<OfferedRide>>
                {
                    Response = rideInfo,
                    ErrorMessage = null
                });
            }catch(Exception ex)
            {
                return Ok(new ResponseBase<List<OfferedRide>>
                {
                    Response = null,
                    ErrorMessage = ex.Message
                });
            }
        }


        // Method  To Book The Ride And Give The Confirmed Ride Infromation to the User
        [HttpPost("rideid"), Authorize]
        public async Task<ActionResult<ResponseBase<BookRide>>> GetConfirmationMessage(int rideId, BookRide bookRideRequest)
        {
            try
            {
                BookRide acceptedRideInfo = await _rides.BookRide(rideId, bookRideRequest);
                return Ok(
                    new ResponseBase<BookRide>
                    {
                        Response = acceptedRideInfo,
                        ErrorMessage = null

                    });
            }catch (Exception ex) {
                return Ok(new ResponseBase<List<BookRide>>
                {
                    Response = null,
                    ErrorMessage = ex.Message
                }) ;

            }
        }


        // Method to Register the User Book Ride Request
        [HttpPost("bookride"), Authorize]
        public async Task<ActionResult<ResponseBase<bool>>> UserBookRide(int userId, BookRide bookRideRequest)
        {
            try
            {
                bool status = await _rides.UserBookRide(userId, bookRideRequest);
                if (status)
                {
                    return Ok(new ResponseBase<bool>
                    {
                        Response = status,
                        ErrorMessage = null
                    });
                    ;
                }
                return Ok(new ResponseBase<bool>
                {
                    Response = false,
                    ErrorMessage = "Could Not Register The Ride"
                });
            }catch(Exception ex) {
                return Ok(new ResponseBase<List<bool>>
                {
                    Response = null,
                    ErrorMessage =ex.Message
                });
            }
        }



        // Method to Register the User Offer Ride Request

        [HttpPost("offerride"), Authorize]
        public async Task<ActionResult<ResponseBase<bool>>> UserOfferRide(int userId, OfferedRide offerRideRequest)
        {
            try
            {
                bool status = await _rides.UserOfferRide(userId, offerRideRequest);
                if (status)
                {
                    return Ok(new ResponseBase<bool>
                    {
                        Response = status,
                        ErrorMessage = null
                    });
                    ;
                }
                return Ok(new ResponseBase<bool>
                {
                    Response = false,
                    ErrorMessage = "Could Not Register The Ride"
                });
            }catch(Exception ex) {
                return Ok(new ResponseBase<List<bool>>
                {
                    Response = null,
                    ErrorMessage =ex.Message
                });
            }
        }
    }
}