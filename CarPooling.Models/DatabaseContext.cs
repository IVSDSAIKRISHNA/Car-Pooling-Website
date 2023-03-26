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
            optionsBuilder.UseSqlServer("Data Source=LAPTOP-NIT4DTQC\\SQLEXPRESS;DataBase=Car-PoolingDb; Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");
        }
    }
}
