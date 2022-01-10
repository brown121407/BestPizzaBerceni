using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BestPizzaBerceni.Data.DTOs;
using BestPizzaBerceni.Data.DTOs.Product;
using Microsoft.AspNetCore.Mvc;
using BestPizzaBerceni.Models;
using BestPizzaBerceni.Repositories;
using BestPizzaBerceni.Repositories.ProductRepository;
using Microsoft.Extensions.Logging;

namespace BestPizzaBerceni.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository _productsRepository;
        private readonly IRepository<Ingredient, int> _ingredientRepository;
        private readonly IRepository<ProductVariant, int> _productVariantRepository;

        public ProductsController(IProductRepository productsRepository, IRepository<Ingredient, int> ingredientRepository, IRepository<ProductVariant, int> productVariantRepository)
        {
            _productsRepository = productsRepository;
            _ingredientRepository = ingredientRepository;
            _productVariantRepository = productVariantRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            return await _productsRepository.GetAllAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _productsRepository.GetByIdAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, [FromBody] ProductUpdateDTO dto)
        {
            var product = await _productsRepository.GetByIdAsync(id);
            if (product is null)
            {
                return NotFound();
            }

            product.Ingredients.Clear();
            product.ProductVariants.Clear();

            foreach (var ingredientId in dto.Ingredients)
            {
                var ingredient = await _ingredientRepository.GetByIdAsync(ingredientId);
                if (ingredient is null)
                {
                    return NotFound();
                }
                product.Ingredients.Add(ingredient);
            }

            foreach (var productVariantId in dto.ProductVariants)
            {
                var productVariant = await _productVariantRepository.GetByIdAsync(productVariantId);
                if (productVariant is null)
                {
                    return NotFound();
                }
                product.ProductVariants.Add(productVariant);
            }

            product.Name = dto.Name;
            
            await _productsRepository.UpdateAsync(product);

            return Ok(product);
        }

        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct([FromBody] ProductCreateDTO dto)
        {
            var ingredients = (await _ingredientRepository.GetAllAsync())
                .Where(ingredient => dto.Ingredients.Contains(ingredient.Id))
                .ToList();
            var variants = (await _productVariantRepository.GetAllAsync())
                .Where(variant => dto.ProductVariants.Contains(variant.Id))
                .ToList();

            var product = new Product
            {
                Name = dto.Name,
                Ingredients = ingredients,
                ProductVariants = variants
            };
            await _productsRepository.CreateAsync(product);

            return CreatedAtAction("GetProduct", new { id = product.Id }, product);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _productsRepository.GetByIdAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            await _productsRepository.DeleteAsync(product);

            return NoContent();
        }
    }
}
