using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BestPizzaBerceni.Data;
using BestPizzaBerceni.Data.Models;
using BestPizzaBerceni.Repositories;

namespace BestPizzaBerceni.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderStatusUpdatesController : ControllerBase
    {
        private readonly IRepository<OrderStatusUpdate, int> _orderStatusUpdateRepository;

        public OrderStatusUpdatesController(IRepository<OrderStatusUpdate, int>  orderStatusUpdateRepository)
        {
            _orderStatusUpdateRepository = orderStatusUpdateRepository;
        }

        // GET: api/OrderStatusUpdates
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderStatusUpdate>>> GetOrderStatusUpdate()
        {
            return await _orderStatusUpdateRepository.GetAllAsync();
        }

        // GET: api/OrderStatusUpdates/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderStatusUpdate>> GetOrderStatusUpdate(int id)
        {
            var orderStatusUpdate = await _orderStatusUpdateRepository.GetByIdAsync(id);

            if (orderStatusUpdate == null)
            {
                return NotFound();
            }

            return orderStatusUpdate;
        }

        // PUT: api/OrderStatusUpdates/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrderStatusUpdate(int id, OrderStatusUpdate orderStatusUpdate)
        {
            if (id != orderStatusUpdate.Id)
            {
                return BadRequest();
            }

            await _orderStatusUpdateRepository.UpdateAsync(orderStatusUpdate);

            return NoContent();
        }

        // POST: api/OrderStatusUpdates
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<OrderStatusUpdate>> PostOrderStatusUpdate(OrderStatusUpdate orderStatusUpdate)
        {
            await _orderStatusUpdateRepository.CreateAsync(orderStatusUpdate);

            return CreatedAtAction("GetOrderStatusUpdate", new { id = orderStatusUpdate.Id }, orderStatusUpdate);
        }

        // DELETE: api/OrderStatusUpdates/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrderStatusUpdate(int id)
        {
            var orderStatusUpdate = await _orderStatusUpdateRepository.GetByIdAsync(id);
            if (orderStatusUpdate == null)
            {
                return NotFound();
            }

            await _orderStatusUpdateRepository.DeleteAsync(orderStatusUpdate);

            return NoContent();
        }

        
    }
}
