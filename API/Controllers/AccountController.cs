using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
    private readonly DataContext dataContext;
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly TokenService _tokenService;
        public AccountController(UserManager<AppUser> userManager,
        SignInManager<AppUser> signInManager, TokenService tokenService)
        {
            _tokenService = tokenService;
            _signInManager = signInManager;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

            return CreateUserObject(user);
        }

        private UserDto CreateUserObject(AppUser user)
        {
            return new UserDto
            {
                Id = user.Id,
                Firstname = user.Firstname,
                Lastname = user.Lastname,
                Email = user.Email,
                Token = _tokenService.CreateToken(user),
                UserName = user.UserName,
                Role = user.Role
            };
        }

        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetAllUsers()
        {
            return await dataContext.Users.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetUserById(string id)
        {
            var user = await dataContext.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }
            
            return user;
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await dataContext.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            dataContext.Users.Remove(user);
            await dataContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);

            if (user == null) return Unauthorized();

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (result.Succeeded)
            {
                return CreateUserObject(user);
            }
            return Unauthorized();
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
            {
                ModelState.AddModelError("email", "Email is taken");
                return ValidationProblem();
            }
            if (await _userManager.Users.AnyAsync(x => x.UserName == registerDto.Username))
            {
                ModelState.AddModelError("username", "Username is taken");
                return ValidationProblem();
            }

            AppUser user = null;

                user = new User
                {
                    Lastname = registerDto.Lastname,
                    UserName = registerDto.Username,
                    Email = registerDto.Email,
                    PasswordHash = registerDto.PasswordHash,
                    PersonalInfo = null,
                    Role = "user"
                };

            var result = await _userManager.CreateAsync(user, registerDto.PasswordHash);

            if (result.Succeeded)
            {
                return CreateUserObject(user);
            }

            return BadRequest("Problem registering user");
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> RegisterAdmin(RegisterDto registerDto)
        {
            if (await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
            {
                ModelState.AddModelError("email", "Email is taken");
                return ValidationProblem();
            }
            if (await _userManager.Users.AnyAsync(x => x.UserName == registerDto.Username))
            {
                ModelState.AddModelError("username", "Username is taken");
                return ValidationProblem();
            }

            AppUser user = null;

            user = new User
            {
                Lastname = registerDto.Lastname,
                UserName = registerDto.Username,
                Email = registerDto.Email,
                PasswordHash = registerDto.PasswordHash,
                PersonalInfo = null,
                Role = "admin"
            };

            var result = await _userManager.CreateAsync(user, registerDto.PasswordHash);

            if (result.Succeeded)
            {
                return CreateUserObject(user);
            }

            return BadRequest("Problem registering user");
        }
    }
}