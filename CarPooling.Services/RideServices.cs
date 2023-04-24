using CarpoolingContracts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.Internal;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarPooling_Services
{
    public class RideServices : IRide
    {
        private readonly DatabaseContext _dbContext;
        public RideServices(DatabaseContext dbContext)
        {
            this._dbContext = dbContext;
        }

       
        //Method to Get the Previously Booked Rides 
        public async Task<List<BookRide>> GetBookedRide(int userId)
        {
            try
            {
                List<BookRide> bookedRides = await _dbContext.BookedRides.Where(n => n.BookerUserId == userId && !n.IsActive).ToListAsync();
                return bookedRides;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Source);
            }
        }


        // Method to Send The Confirmation Message along with the Confirmed Ride Object
        public async Task<BookRide> BookRide(int selectedRideId, BookRide bookRideRequest)
        {
            try
            {
                OfferedRide selectedRide = await _dbContext.OfferedRides.FindAsync(selectedRideId);
                // Extraction of the Source and Destination from the User Request 
               


                string source = bookRideRequest.StartPoint.ToLower();
              
                string destination = bookRideRequest.EndPoint.ToLower();
                
                int sourceIndex = 0;
                int destinationIndex = 0;
                // Extraction of the Complete Path including the Starting point and the end point 

                List<string> completePath = new List<string>();
                
                completePath.Add(selectedRide.StartPoint);
                List<string> intermediateStops = selectedRide.IntermediatePoints.Split(".").ToList();
                if (intermediateStops.Count != 1 && intermediateStops[0] != " ")
                {
                    completePath.InsertRange(1, intermediateStops);
                }
                completePath.Add(selectedRide.EndPoint);
              
                completePath = completePath.Select(p => p.ToLower()).ToList();
                // Finding out the Index of Source and Destination Points in the Complete Path 

                if (completePath.Contains(source) && completePath.Contains(destination))
                {
                    
                    
                    for (int i = 0; i < completePath.Count; i++)
                    {
                        
                        if (completePath[i].ToLower() == source.ToLower())
                        {
                           
                            sourceIndex = i;
                            
                        }
                        if (completePath[i].ToLower() == destination.ToLower())
                        {
                            
                            destinationIndex = i;
                            
                        }
                    }

                }
                // Splitting the Vacancy from a string to list and then decreasing the Vacancies while booking 
                // And then Merging them back to the String so that we can store it in the Database
                IEnumerable<string> vacancy = selectedRide.Capacity.Split(".");
                List<int> vacancies = vacancy.Select(n => Convert.ToInt32(n)).ToList();
               
                for (int i = sourceIndex; i < destinationIndex; i++)
                {
                    vacancies[i] -= 1;
                }
                string newCapacity = "";

                foreach (int i in vacancies)
                {
                    newCapacity = newCapacity + "." + i.ToString();
                }
                newCapacity = newCapacity.Substring(1, newCapacity.Length - 1);

                selectedRide.Capacity = newCapacity;
               


                // Updating the Status of the Selected Ride After Booking 
                bool statusOfTheRide = this.StatusUpdate(selectedRide);
                if (!statusOfTheRide)
                {
                    selectedRide.IsActive = false;
                }


                // Calculating the Fare 

                bookRideRequest.Fare = (destinationIndex - sourceIndex) * selectedRide.FarePerBlock;
                bookRideRequest.OffererUserId = selectedRide.OffererId;
                bookRideRequest.OffererName = selectedRide.OffererName;
                bookRideRequest.IsActive = false;
                await this.UserBookRide(bookRideRequest.BookerUserId, bookRideRequest);
                
                   
                    await _dbContext.SaveChangesAsync();
                    return bookRideRequest;
                
               
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                throw new Exception(e.Source);
            }

        }



        // Method to Get All The Previously Offered Rides by an User
        public async Task<List<OfferedRide>> GetOfferedRide(int userId)
        {
            try
            {
                List<OfferedRide> offeredRides = await _dbContext.OfferedRides.Where(n => n.OffererId == userId).ToListAsync();
                return offeredRides;
            }
            catch (Exception e)
            {
                throw new Exception(e.Source);
            }
        }



        // Method to return all the Matching Rides with respect to the Request of the User
        public async Task<List<OfferedRide>> MatchedRides(BookRide bookRideInfo)
        {
            try
            {
                // Getting all the Rides From the Database Which are Currently Active
                List<OfferedRide> allRides = await _dbContext.OfferedRides.Where(n => n.IsActive == true).Select(n => n).ToListAsync();
                // List to Store  All The Matched Rides 

                List<OfferedRide> matchedRides = new List<OfferedRide>();

                // Extraction of Source and Destination and their respective Indexes
                string source = bookRideInfo.StartPoint.ToLower();
                string destination = bookRideInfo.EndPoint.ToLower();
                int sourceIndex = 0;
                int destinationIndex = 0;
                foreach (OfferedRide ride in allRides)
                {
                    List<string> completePath = new List<string>();
                    completePath.Add(ride.StartPoint);
                    Console.WriteLine(ride.IntermediatePoints);
                    List<string> intermediateStops = ride.IntermediatePoints.Split(".").ToList();
                    if (intermediateStops.Count != 0 && intermediateStops[0] != " ")
                    {
                        completePath.InsertRange(1, intermediateStops);
                    }

                    completePath.Add(ride.EndPoint);

                    completePath = completePath.Select(p => p.ToLower()).ToList();
                    

                    if (completePath.Contains(source) && completePath.Contains(destination) && ride.TimeSlot == bookRideInfo.TimeSlot && ride.Date == bookRideInfo.Date)
                    {
                        
                        for (int i = 0; i < completePath.Count; i++)
                        {
                            if (completePath[i] == source)
                            {
                                sourceIndex = i;
                            }
                            if (completePath[i] == destination)
                            {
                                destinationIndex = i;
                            }
                        }
                        // Checking the Direction of the Ride and Vacancy
                        if (destinationIndex > sourceIndex)
                        {
                            if (ride.Capacity.Length > 1)
                            {
                                if (HasVacancy(sourceIndex, destinationIndex, ride))
                                {
                                    matchedRides.Add(ride);
                                }
                            }
                            // IF There are only two stops its better to compare it here itself rather than calling it the function
                            else
                            {
                                if (Convert.ToInt32(ride.Capacity) > 0)
                                {
                                    matchedRides.Add(ride);
                                }
                            }
                        }
                    }

                }
                // returning the List containing all the Matched Rides 
                return matchedRides;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Source);
            }
        }



        // Method to Register a Book Ride Request from the User
        public async Task<bool> UserBookRide(int userId, BookRide bookRideRequest)
        {
            try
            {
                bookRideRequest.BookerUserId = userId;
                _dbContext.BookedRides.Add(bookRideRequest);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Source);
            }

        }



        // Method to Register a Offer a Ride Request from the User
        public async Task<bool> UserOfferRide(int userId, OfferedRide offeredRideRequest)
        {
            try
            {
                string offererName = this._dbContext.Users.Where(n => n.UserId == userId).Select(n => n.UserName).FirstOrDefault();
                offeredRideRequest.OffererName = offererName;
                offeredRideRequest.OffererId = userId;
                _dbContext.OfferedRides.Add(offeredRideRequest);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw new Exception(ex.Source);
            }
        }




        // Method Which Checks for the Vacancy from the source and destination 
        public bool HasVacancy(int source, int destinaiton, OfferedRide avaliableRide)
        {
            try
            {
                IEnumerable<string> vacancy = avaliableRide.Capacity.Split(".");
                vacancy = vacancy.Where(n => !n.Equals(" ")).Select(n => n);
                List<int> vacancies = vacancy.Select(n => Convert.ToInt32(n)).ToList();

                for (int i = source; i < destinaiton; i++)
                {
                    if (vacancies[i] <= 0)
                    {
                        return false;
                    }
                }

                return true;
            }
            catch (Exception ex) { 
                throw new Exception(ex.Source); 
            }

        }




        // Incase if the Ride is Completely Booked , We will change its (IsActive)status from true to false 
        public bool StatusUpdate(OfferedRide ride)
        {
            try
            {
                IEnumerable<string> vacancy = ride.Capacity.Split(".");
                List<int> vacancies = vacancy.Select(n => Convert.ToInt32(n)).ToList();

                for (int i = 0; i < vacancies.Count; i++)
                {

                    if (vacancies[i] != 0)
                    {
                        return true;
                    }
                }
                return false;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Source);
            }
        }


    }
}