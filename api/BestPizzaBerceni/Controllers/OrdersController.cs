using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BestPizzaBerceni.Data;
using BestPizzaBerceni.Data.DTOs.Order;
using BestPizzaBerceni.Data.Models;
using BestPizzaBerceni.Repositories;
using BestPizzaBerceni.Repositories.OrderRepository;

namespace BestPizzaBerceni.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IRepository<Address, int> _addressRepository;
        private readonly IRepository<OrderItem, int> _orderItemRepository;

        public OrdersController(IOrderRepository orderRepository, IRepository<Address, int> addressRepository, IRepository<OrderItem, int> orderItemRepository)
        {
            _orderRepository = orderRepository;
            _addressRepository = addressRepository;
            _orderItemRepository = orderItemRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            return await _orderRepository.GetAllAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _orderRepository.GetByIdAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Order>> PutOrder(int id, OrderUpdateDTO dto)
        {
            var order = await _orderRepository.GetByIdAsync(id);
            if (order is null)
            {
                return NotFound();
            }

            var address = await _addressRepository.GetByIdAsync(dto.Address);
            if (address is null)
            {
                return NotFound();
            }

            order.Address = address;
            
            dto.OrderItems.Clear();
            foreach (var orderItemId in dto.OrderItems)
            {
                var orderItem = await _orderItemRepository.GetByIdAsync(orderItemId);
                if (orderItem is null)
                {
                    return NotFound();
                }
                order.OrderItems.Add(orderItem);
            }

            await _orderRepository.UpdateAsync(order);

            return Ok(address);
        }

        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder(OrderCreateDTO dto)
        {
            var address = await _addressRepository.GetByIdAsync(dto.Address);
            if (address is null)
            {
                return NotFound();
            }
            
            var order = new Order
            {
                Address = address
            };
            
            await _orderRepository.CreateAsync(order);

            return CreatedAtAction("GetOrder", new { id = order.Id }, order);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _orderRepository.GetByIdAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            await _orderRepository.DeleteAsync(order);

            return NoContent();
        }
    }
}
