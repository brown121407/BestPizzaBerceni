using System.Collections.Generic;
using System.Threading.Tasks;
using BestPizzaBerceni.Data.DTOs.CartItem;
using BestPizzaBerceni.Data.Models;
using Microsoft.AspNetCore.Mvc;
using BestPizzaBerceni.Models;
using BestPizzaBerceni.Repositories;
using BestPizzaBerceni.Repositories.CartItemRepository;
using BestPizzaBerceni.Repositories.UserRepository;
using Microsoft.AspNetCore.Authorization;

namespace BestPizzaBerceni.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartItemsController: ControllerBase
    {
        private readonly ICartItemRepository _cartItemRepository;
        private readonly IUserRepository _userRepository;
        private readonly IRepository<ProductVariant, int> _productVariantRepository;

        public CartItemsController(ICartItemRepository cartItemRepository, IUserRepository userRepository, IRepository<ProductVariant, int> productVariantRepository)
        {
            _cartItemRepository = cartItemRepository;
            _userRepository = userRepository;
            _productVariantRepository = productVariantRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CartItem>>> GetCartItems([FromQuery] int? userId)
        {
            if (userId is null)
            {
                return await _cartItemRepository.GetAllAsync();
            }

            return await _cartItemRepository.GetByUserId(userId.Value);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CartItem>> GetCartItem(int id)
        {
            var cartItem = await _cartItemRepository.GetByIdAsync(id);

            if (cartItem is null)
            {
                return NotFound();
            }

            return cartItem;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<CartItem>> PutCartItem(int id, CartItemUpdateDTO dto)
        {
            var cartItem = await _cartItemRepository.GetByIdAsync(id);
            if (cartItem is null)
            {
                return NotFound();
            }

            var user = await _userRepository.GetByIdWithRolesAsync(dto.User);
            if (user is null)
            {
                return NotFound();
            }

            var productVariant = await _productVariantRepository.GetByIdAsync(dto.ProductVariant);
            if (productVariant is null)
            {
                return NotFound();
            }

            cartItem.Quantity = dto.Quantity;
            cartItem.User = user;
            cartItem.ProductVariant = productVariant;

            await _cartItemRepository.UpdateAsync(cartItem);

            return Ok(cartItem);
        }

        [HttpPost]
        public async Task<ActionResult<CartItem>> PostCartItem(CartItemCreateDTO dto)
        {
            var user = await _userRepository.GetByIdWithRolesAsync(dto.User);
            if (user is null)
            {
                return NotFound();
            }

            var productVariant = await _productVariantRepository.GetByIdAsync(dto.ProductVariant);
            if (productVariant is null)
            {
                return NotFound();
            }

            var cartItem = new CartItem()
            {
                Quantity = dto.Quantity,
                User = user,
                ProductVariant = productVariant
            };
            
            await _cartItemRepository.CreateAsync(cartItem);

            return CreatedAtAction("GetCartItem", new {id = cartItem.Id}, cartItem);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCartItem(int id)
        {
            var cartItem = await _cartItemRepository.GetByIdAsync(id);
            if (cartItem == null)
            {
                return NotFound();
            }

            await _cartItemRepository.DeleteAsync(cartItem);

            return NoContent();
        }
    }
}
















