using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Job_Application.Models
{
    public class Address
    {
        public int id { get; set; }
        public string addrLine1 { get; set; }
        public string addrLine2 { get; set; }
        public string city { get; set; }
        public string state { get; set; }
        public int zipCode { get; set; }
        public string country { get; set; }
        public int Userid { get; set; }
        public User User { get; set; }

    }
}
