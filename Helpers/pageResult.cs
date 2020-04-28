using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Job_Application.Models
{
    public class pageResult
    {
        public List<User> users { get; set; }
        public int totalUsersInDb { get; set; }
    }
}
