﻿using Job_Application.Data;
using Job_Application.Interfaces;
using Job_Application.Models;
using Job_Application.Helpers;
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

            // Traversing each user to get its address from address table using user id
            foreach (User user in userList)
            {
                user.address = _context.Address.FirstOrDefault(a => a.Userid == user.id);
            }

            return userList;
        }

        // To get users per page
        public pageResult GetUsersPerPage(page query)
        {
            var result = new pageResult();

            result.totalUsersInDb = _context.User.Count(); // No. of users in User table

            if (query.pageNumber <= 0 || query.pageCount<=0)
            {
                return result; // returns empty object
            }

            // To skip and take records from user table on basis of query
            var userList =_context.User.Skip(query.pageCount * (query.pageNumber - 1)).Take(query.pageCount).ToList();

            // Traversing each user to get its address from address table on basis of user id
            foreach (User user in userList)
            {
                user.address = _context.Address.FirstOrDefault(a => a.Userid == user.id);
            }

            result.users = userList;
            return result;
        }


        // To get User By Id
        public async Task<User> GetUserById(int id)
        {
            var user= await _context.User.FindAsync(id);

            // To get address of particular user from user table
            user.address = _context.Address.FirstOrDefault(a => a.Userid == user.id);

            return user;
        }

        // To get user by email
        public User GetUserByEmail(User user)
        {
            var userobj = _context.User.FirstOrDefault(u => u.email == user.email);
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
            // Edit address of user
            Address address = user.address;
            _context.Entry(address).State = EntityState.Modified;

            // Edit rest user's details
            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return user;
        }

        // To delete user
        public async Task<User> DeleteUser(User user)
        {
            // Delete user's resume file when user is deleted
            if ((System.IO.File.Exists(user.resumeDbPath)))
            {
                System.IO.File.Delete(user.resumeDbPath);
            }

            //removes user from user table
            _context.User.Remove(user);

            await _context.SaveChangesAsync();
            return user;
        }

        // To check user Exists or not by user id
        public bool UserExists(int id)
        {
            return _context.User.Any(e => e.id == id);
        }

        
    }
}
