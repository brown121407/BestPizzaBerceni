using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BestPizzaBerceni.Models;
using BestPizzaBerceni.Repositories;
using Microsoft.AspNetCore.Authorization;

namespace BestPizzaBerceni.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class IngredientsController : ControllerBase
    {
        private readonly IRepository<Ingredient, int> _ingredientsRepository;

        public IngredientsController(IRepository<Ingredient, int> ingredientsRepository)
        {
            _ingredientsRepository = ingredientsRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ingredient>>> GetIngredients()
        {
            return await _ingredientsRepository.GetAllAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Ingredient>> GetIngredient(int id)
        {
            var ingredient = await _ingredientsRepository.GetByIdAsync(id);
            
            if (ingredient is null)
            {
                return NotFound();
            }

            return ingredient;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutIngredient(int id, Ingredient ingredient)
        {
            if (id != ingredient.Id)
            {
                return BadRequest();
            }

            await _ingredientsRepository.UpdateAsync(ingredient);

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Ingredient>> PostIngredient(Ingredient ingredient)
        {
            await _ingredientsRepository.CreateAsync(ingredient);

            return CreatedAtAction("GetIngredient", new { id = ingredient.Id }, ingredient);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIngredient(int id)
        {
            var ingredient = await _ingredientsRepository.GetByIdAsync(id);
            if (ingredient == null)
            {
                return NotFound();
            }

            await _ingredientsRepository.DeleteAsync(ingredient);

            return NoContent();
        }
    }
}
