using System.Collections.Generic;
using System.Threading.Tasks;
using BestPizzaBerceni.Models;
using BestPizzaBerceni.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BestPizzaBerceni.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly IRepository<User, int> _usersRepository;

        public UsersController(IRepository<User, int> usersRepository)
        {
            _usersRepository = usersRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _usersRepository.GetAllAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            return await _usersRepository.GetByIdAsync(id);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            await _usersRepository.UpdateAsync(user);

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