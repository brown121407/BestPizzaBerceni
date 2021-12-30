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
    public class CuponsController: ControllerBase
    {
        private readonly IRepository<Coupon, int> _cuponsRepository;

        public CuponsController(IRepository<Coupon, int> cuponsRepository)
        {
            _cuponsRepository = cuponsRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Coupon>>> GetCupons()
        {
            return await _cuponsRepository.GetAllAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Coupon>> GetCupon(int id)
        {
            var cupon = await _cuponsRepository.GetByIdAsync(id);

            if (cupon is null)
            {
                return NotFound();
            }

            return cupon;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutCupon(int id, Coupon cupon)
        {
            if (id != cupon.Id)
            {
                return BadRequest();
            }

            await _cuponsRepository.UpdateAsync(cupon);

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Coupon>> PostCupon(Coupon cupon)
        {
            await _cuponsRepository.CreateAsync(cupon);

            return CreatedAtAction("GetCupon", new {id = cupon.Id}, cupon);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCupon(int id)
        {
            var cupon = await _cuponsRepository.GetByIdAsync(id);
            if (cupon == null)
            {
                return NotFound();
            }

            await _cuponsRepository.DeleteAsync(cupon);

            return NoContent();
        }
    }
}
















