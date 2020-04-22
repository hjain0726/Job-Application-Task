using Job_Application.Data;
using Job_Application.Interfaces;
using Job_Application.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Job_Application.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly Job_ApplicationContext _context;
        public UserRepository(Job_ApplicationContext context)
        {
            _context = context;
        }

        // To get All Users
        public async Task<List<User>> GetUsers()
        {
            var userList = await _context.User.ToListAsync();
            foreach (User user in userList)
            {
                user.Address = _context.Address.FirstOrDefault(a => a.UserId == user.Id);
            }
            return userList;
        }

        // To get User By Id
        public async Task<User> GetUserById(int id)
        {
            var user= await _context.User.FindAsync(id);
            user.Address = _context.Address.FirstOrDefault(a => a.UserId == user.Id);
            return user;
        }

        // To get user by email
        public User GetUserByEmail(User user)
        {
            var userobj = _context.User.FirstOrDefault(u => u.Email == user.Email);
            return userobj;
        }

        // To register user
        public async Task<User> PostUser(User user)
        {

            _context.User.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        // To edit user Details
        public async Task<User> EditUser(int id, User user)
        {
            // Edit address
            Address address = user.Address;
            _context.Entry(address).State = EntityState.Modified;

            // Edit rest user's details
            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return user;
        }

        // To delete user
        public async Task<User> DeleteUser(User user)
        {
            _context.User.Remove(user);
            await _context.SaveChangesAsync();
            return user;
        }

        // To check user Exists or not by user id
        public bool UserExists(int id)
        {
            return _context.User.Any(e => e.Id == id);
        }
    }
}
