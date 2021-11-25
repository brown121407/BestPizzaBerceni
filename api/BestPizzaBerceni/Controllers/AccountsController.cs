using System.Linq;
using System.Threading.Tasks;
using BestPizzaBerceni.Data.DTOs;
using BestPizzaBerceni.Models;
using BestPizzaBerceni.Services.UserService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BestPizzaBerceni.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IUserService _userService;

        public AccountsController(UserManager<User> userManager, IUserService userService)
        {
            _userManager = userManager;
            _userService = userService;
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] RegisterUserDTO dto)
        {
            var user = await _userManager.FindByEmailAsync(dto.Email);

            if (user is not null)
            {
                return BadRequest("The user already exists!");
            }

            var result = await _userService.RegisterUserAsync(dto);

            if (result.Succeeded)
            {
                return Ok(result);
            }

            return BadRequest(result.Errors.ToList());
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginUserDTO dto)
        {
            var token = await _userService.LoginUserAsync(dto);

            if (token is null)
            {
                return Unauthorized();
            }

            return Ok(token);
        }
    }
}