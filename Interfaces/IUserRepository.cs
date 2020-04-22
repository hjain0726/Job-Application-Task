using Job_Application.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Job_Application.Interfaces
{
    public interface IUserRepository
    {
        public Task<List<User>> GetUsers();
        public Task<User> GetUserById(int id);
        public User GetUserByEmail(User user);
        public Task<User> PostUser(User user);
        public Task<User> EditUser(int id, User user);
        public Task<User> DeleteUser(User user);
        public bool UserExists(int id);

    }
}
