using System.Collections.Generic;
using System.Threading.Tasks;
using BestPizzaBerceni.Data.DTOs.Product;
using Microsoft.AspNetCore.Mvc;
using BestPizzaBerceni.Models;
using BestPizzaBerceni.Repositories;
using BestPizzaBerceni.Repositories.ProductRepository;

namespace BestPizzaBerceni.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductVariantsController : ControllerBase
    {
        private readonly IRepository<ProductVariant, int> _productVariantRepository;
        private readonly IProductRepository _productRepository;

        public ProductVariantsController(IRepository<ProductVariant, int> productVariantRepository, IProductRepository productRepository)
        {
            _productVariantRepository = productVariantRepository;
            _productRepository = productRepository;
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
        public async Task<IActionResult> PutProductVariant(int id, ProductVariantUpdateDTO dto)
        {
            var productVariant = await _productVariantRepository.GetByIdAsync(id);
            if (productVariant is null)
            {
                return NotFound();
            }
            
            var product = await _productRepository.GetByIdAsync(dto.Product);
            if (product is null)
            {
                return NotFound();
            }

            productVariant.Name = dto.Name;
            productVariant.Price = dto.Price;
            productVariant.Quantity = dto.Quantity;
            productVariant.Unit = dto.Unit;
            productVariant.Product = product;

            await _productVariantRepository.UpdateAsync(productVariant);

            return Ok(productVariant);
        }

        [HttpPost]
        public async Task<ActionResult<ProductVariant>> PostProductVariant(ProductVariantUpdateDTO dto)
        {
           var product = await _productRepository.GetByIdAsync(dto.Product);
           if (product is null)
           {
               return NotFound();
           }

           var productVariant = new ProductVariant
           {
               Name = dto.Name,
               Price = dto.Price,
               Quantity = dto.Quantity,
               Unit = dto.Unit,
               Product = product
           };
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
