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
    public class CouponsController: ControllerBase
    {
        private readonly IRepository<Coupon, int> _couponsRepository;

        public CouponsController(IRepository<Coupon, int> couponsRepository)
        {
            _couponsRepository = couponsRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Coupon>>> GetCoupons()
        {
            return await _couponsRepository.GetAllAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Coupon>> GetCoupon(int id)
        {
            var coupon = await _couponsRepository.GetByIdAsync(id);

            if (coupon is null)
            {
                return NotFound();
            }

            return coupon;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutCoupon(int id, Coupon coupon)
        {
            if (id != coupon.Id)
            {
                return BadRequest();
            }

            await _couponsRepository.UpdateAsync(coupon);

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Coupon>> PostCoupon(Coupon coupon)
        {
            await _couponsRepository.CreateAsync(coupon);

            return CreatedAtAction("GetCoupon", new {id = coupon.Id}, coupon);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCoupon(int id)
        {
            var coupon = await _couponsRepository.GetByIdAsync(id);
            if (coupon == null)
            {
                return NotFound();
            }

            await _couponsRepository.DeleteAsync(coupon);

            return NoContent();
        }
    }
}
















