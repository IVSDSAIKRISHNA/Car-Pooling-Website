using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
     public  class OfferedRide 
    {

        [Key] public int RideId { get; set; }

        public string StartPoint { get; set; }

        public string EndPoint { get; set; }

        public string Date { get; set; }

        public bool IsActive { get; set; } = false;

        public string TimeSlot { get; set; }
        public string IntermediatePoints { get; set; }
        public string Capacity { get; set; }

        public string OffererName { get; set; }
        public int FarePerBlock { get; set; }
        public int OffererId { get; set; }
    }
}
