using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public  class DatabaseContext :DbContext
    {
        public DbSet<User> Users { get; set; }

        public DbSet<Ride> Rides { get; set; } 

        public DbSet<BookRide> BookedRides { get; set; }

        public DbSet<OfferedRide> OfferedRides { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseSqlServer("Server=tcp:carpooling5.database.windows.net,1433;Initial Catalog=CarPoolDatabase1;Persist Security Info=False;User ID=azureadmin;Password=Zebronics1@345;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
        }
    }
}
