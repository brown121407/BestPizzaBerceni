using System.Collections.Generic;
using System.Threading.Tasks;
using BestPizzaBerceni.Data.Models;
using Microsoft.AspNetCore.Mvc;
using BestPizzaBerceni.Repositories;

namespace BestPizzaBerceni.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductVariantsController : ControllerBase
    {
        private readonly IRepository<ProductVariant, int> _productVariantRepository;

        public ProductVariantsController(IRepository<ProductVariant, int> productVariantRepository)
        {
            _productVariantRepository = productVariantRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductVariant>>> GetProductVariants()
        {
            return await _productVariantRepository.GetAllAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductVariant>> GetProductVariant(int id)
        {
            var productVariant = await _productVariantRepository.GetByIdAsync(id);

            if (productVariant == null)
            {
                return NotFound();
            }

            return productVariant;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductVariant(int id, ProductVariant productVariant)
        {
            if (id != productVariant.Id)
            {
                return BadRequest();
            }

            await _productVariantRepository.UpdateAsync(productVariant);

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<ProductVariant>> PostProductVariant(ProductVariant productVariant)
        {
            await _productVariantRepository.CreateAsync(productVariant);

            return CreatedAtAction("GetProductVariant", new { id = productVariant.Id }, productVariant);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductVariant(int id)
        {
            var productVariant = await _productVariantRepository.GetByIdAsync(id);
            if (productVariant == null)
            {
                return NotFound();
            }

            await _productVariantRepository.DeleteAsync(productVariant);

            return NoContent();
        }
    }
}
