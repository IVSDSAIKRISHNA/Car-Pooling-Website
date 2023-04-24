using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarpoolingContracts
{
    public interface IRide
    {


        // Will return the Matched rides 
        Task<List<OfferedRide>> MatchedRides(BookRide bookRideInfo);

        // Method to get all the Rides Booked by the user Based on UserId
        Task<List<BookRide>> GetBookedRide(int userId);

        // Method to return all the offered rides by the user 
        Task<List<OfferedRide>> GetOfferedRide(int userId);

        //Method to Send the Confirmation message with updated BookRide info, here we shall make the RideRequest Inactive
        Task<BookRide> BookRide(int rideId,BookRide bookRideRequest);

        // Regisering the request for Book a ride by the user
        Task<bool> UserBookRide(int userId, BookRide bookRideReq);


        // Registering the request for Offer a ride by a user 
        Task<bool> UserOfferRide(int userId, OfferedRide offeredRideReq);
    }
}
