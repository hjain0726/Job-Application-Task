using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Job_Application.Models
{
    public class User
    {
        public int id { get; set; }
        public string firstName { get; set; }
        public string middleName { get; set; }
        public string lastName { get; set; }
        public Address address { get; set; }
        public string email { get; set; }
        public string countryCode { get; set; }
        public string phone { get; set; }
        public string position { get; set; }
        public string startDate { get; set; }
        public string resumeDbPath { get; set; }
    }
}
