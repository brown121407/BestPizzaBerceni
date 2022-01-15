using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BestPizzaBerceni.Data.DTOs;
using BestPizzaBerceni.Data.DTOs.User;
using BestPizzaBerceni.Data.Models;
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
    //[Authorize]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _usersRepository;
        private readonly IRoleRepository _rolesRepository;
        private readonly IRepository<Address, int> _addressRepository;

        public UsersController(IUserRepository usersRepository, IRoleRepository rolesRepository, IRepository<Address, int> addressRepository)
        {
            _usersRepository = usersRepository;
            _rolesRepository = rolesRepository;
            _addressRepository = addressRepository;
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
                Roles = user.Roles.Select(x => x.Name).ToList(),
                Addresses = user.Addresses.Select(x => x.Id).ToList()
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
                Roles = user.Roles.Select(x => x.Name).ToList(),
                Addresses = user.Addresses.Select(x => x.Id).ToList()
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
            realUser.Addresses.Clear();

            foreach (var roleName in user.Roles)
            {
                var role = await _rolesRepository.GetByNameAsync(roleName);
                if (role is null)
                {
                    return NotFound();
                }
                realUser.Roles.Add(role);
            }

            foreach (var addressId in user.Addresses)
            {
                var address = await _addressRepository.GetByIdAsync(addressId);
                if (address is null)
                {
                    return NotFound();
                }
                realUser.Addresses.Add(address);
            }
            
            await _usersRepository.UpdateAsync(realUser);

            return NoContent();
        }

        [HttpPost]
        /*public async Task<ActionResult<Ingredient>> PostUser(User user)
        {
            await _usersRepository.CreateAsync(user);

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }*/
        public async Task<ActionResult<User>> PostUser([FromBody] UserDTO dto)
        {
            var roles = (await _rolesRepository.GetAllAsync())
                .Where(role => dto.Roles.Contains(role.Name))
                .ToList();
            var addresses = (await _addressRepository.GetAllAsync())
                .Where(address => dto.Addresses.Contains(address.Id))
                .ToList();

            var user = new User
            {
                Id = dto.Id,
                Email = dto.Email,
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Addresses = addresses,
                Roles = roles
            };
            await _usersRepository.CreateAsync(user);

            return CreatedAtAction("GetUser", user);
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _usersRepository.GetByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            await _usersRepository.DeleteAsync(user);

            return NoContent();
        }
    }
}