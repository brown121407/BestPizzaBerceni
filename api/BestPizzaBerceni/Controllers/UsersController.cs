using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BestPizzaBerceni.Data.DTOs;
using BestPizzaBerceni.Data.DTOs.User;
using BestPizzaBerceni.Models;
using BestPizzaBerceni.Repositories;
using BestPizzaBerceni.Repositories.RoleRepository;
using BestPizzaBerceni.Repositories.UserRepository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BestPizzaBerceni.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _usersRepository;
        private readonly IRoleRepository _rolesRepository;

        public UsersController(IUserRepository usersRepository, IRoleRepository rolesRepository)
        {
            _usersRepository = usersRepository;
            _rolesRepository = rolesRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetUsers()
        {
            var users = (await _usersRepository.GetAllAsync()).Select(user => new UserDTO()
            {
                Id = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Roles = user.Roles.Select(x => x.Name).ToList()
            });
            
            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserDTO>> GetUser(int id)
        {
            var user = await _usersRepository.GetByIdAsync(id);
            if (user is null)
            {
                return NotFound();
            }

            return new UserDTO
            {
                Id = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Roles = user.Roles.Select(x => x.Name).ToList()
            };
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, UserDTO user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            var realUser = await _usersRepository.GetByIdAsync(id);
            if (realUser is null)
            {
                return NotFound();
            }
            
            realUser.FirstName = user.FirstName;
            realUser.LastName = user.LastName;
            //realUser.Email = user.Email;
            realUser.Roles.Clear();

            foreach (var roleName in user.Roles)
            {
                var role = await _rolesRepository.GetByNameAsync(roleName);
                if (role is null)
                {
                    return NotFound();
                }
                realUser.Roles.Add(role);
            }
            
            await _usersRepository.UpdateAsync(realUser);

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Ingredient>> PostUser(User user)
        {
            await _usersRepository.CreateAsync(user);

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var ingredient = await _usersRepository.GetByIdAsync(id);
            if (ingredient == null)
            {
                return NotFound();
            }

            await _usersRepository.DeleteAsync(ingredient);

            return NoContent();
        }
    }
}