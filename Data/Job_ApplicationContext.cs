using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Job_Application.Models;

namespace Job_Application.Data
{
    public class Job_ApplicationContext : DbContext
    {
        public Job_ApplicationContext (DbContextOptions<Job_ApplicationContext> options)
            : base(options)
        {
        }

        public DbSet<Job_Application.Models.User> User { get; set; }
        public DbSet<Job_Application.Models.Address> Address { get; set; }
    }
}
