using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public  class Ride
    {

        public int UserId { get; set; }
        [Key] public int RideId { get; set; }

        public string StartPoint { get; set; }

        public string EndPoint { get; set; }

        public DateTime Date { get; set; }

        public bool IsActive { get; set; }=false;

        public string TimeSlot { get; set; }

        
    }
}
