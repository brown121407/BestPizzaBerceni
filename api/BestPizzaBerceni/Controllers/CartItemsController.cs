using System.Collections.Generic;
using System.Threading.Tasks;
using BestPizzaBerceni.Data.Models;
using Microsoft.AspNetCore.Mvc;
using BestPizzaBerceni.Models;
using BestPizzaBerceni.Repositories;
using Microsoft.AspNetCore.Authorization;

namespace BestPizzaBerceni.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartItemsController: ControllerBase
    {
        private readonly IRepository<CartItem, int> _cartItemRepository;

        public CartItemsController(IRepository<CartItem, int> cartItemRepository)
        {
            _cartItemRepository = cartItemRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CartItem>>> GetCartItems()
        {
            return await _cartItemRepository.GetAllAsync();
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
        public async Task<IActionResult> PutCartItem(int id, CartItem cartItem)
        {
            if (id != cartItem.Id)
            {
                return BadRequest();
            }

            await _cartItemRepository.UpdateAsync(cartItem);

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<CartItem>> PostCartItem(CartItem cartItem)
        {
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
















