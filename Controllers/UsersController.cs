using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Job_Application.Data;
using Job_Application.Models;
using Job_Application.Interfaces;
using Job_Application.Helpers;
using System.IO;
using System.Net.Http.Headers;

namespace Job_Application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _IUserRepository;
        private readonly Job_ApplicationContext _context;


        public UsersController(IUserRepository IUserRepository, Job_ApplicationContext context)
        {
            _IUserRepository = IUserRepository;
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUser()
        {
            return await _IUserRepository.GetUsers();
        }

        // GET: api/Users/userPerPage?pageNumber=1&pageCount=1
        [Route("userPerPage")]
        [HttpGet]
        public pageResult GetUserPerPage([FromQuery] page query)
        {
            return _IUserRepository.GetUsersPerPage(query); 
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _IUserRepository.GetUserById(id);

            if (user == null)
            {
                return NotFound(new NotFoundError("User not found"));
            }

            return user;
        }

        // POST: api/Users
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            var userobj = _IUserRepository.GetUserByEmail(user);
            if (userobj != null)
            {
                return Ok(new ApiResponse(new
                {
                    Success = false,
                    Message = " User Already Exists"
                }));
            }
            else
            {
                await _IUserRepository.PostUser(user);
                return Ok(new ApiResponse(new
                {
                    Success = true,
                    Message = " User Successfully Register"
                }));
            }

        }

        // Post: api/Users/upload
        [Route("upload")]
        [HttpPost, DisableRequestSizeLimit]
        public IActionResult Upload()
        {
            try
            {
                var file = Request.Form.Files[0];
                var folderName = Path.Combine("Resources", "Uploads");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                if (file.Length > 0)
                {
                    var fileName = DateTime.Now.ToString("yyyy’-‘MM’-‘dd’T’HH’:’mm’:’ss") +
                       ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }

                    return Ok(new { dbPath });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }

        // PUT: api/Users/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.id)
            {
                return BadRequest("User Id does not matches");
            }

            try
            {
                await _IUserRepository.EditUser(id,user);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound(new NotFoundError("User not found"));
                }
                else
                {
                    throw;
                }
            }

            return Ok(new ApiResponse(new
            {
                Success = true,
                Message = " User Details Successfully updated"
            }));
        }

       
        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> DeleteUser(int id)
        {
            var user = await _IUserRepository.GetUserById(id);
            if (user == null)
            {
                return NotFound(new NotFoundError("User not found"));
            }
            await _IUserRepository.DeleteUser(user);
            return Ok(new ApiResponse(new
            {
                Success = true,
                Message = " User Successfully Deleted"
            }));
        }

        private bool UserExists(int id)
        {
            return _IUserRepository.UserExists(id);
        }
    }
}
