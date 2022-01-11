using System.Collections.Generic;
using System.Threading.Tasks;
using BestPizzaBerceni.Data.DTOs.Coupon;
using BestPizzaBerceni.Data.Models;
using Microsoft.AspNetCore.Mvc;
using BestPizzaBerceni.Models;
using BestPizzaBerceni.Repositories;
using BestPizzaBerceni.Repositories.CouponRepository;
using BestPizzaBerceni.Repositories.UserRepository;
using Microsoft.AspNetCore.Authorization;

namespace BestPizzaBerceni.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CouponsController: ControllerBase
    {
        private readonly ICouponRepository _couponsRepository;
        private readonly IUserRepository _userRepository;

        public CouponsController(ICouponRepository couponsRepository, IUserRepository userRepository)
        {
            _couponsRepository = couponsRepository;
            _userRepository = userRepository;
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
        public async Task<IActionResult> PutCoupon(int id, CouponUpdateDTO dto)
        {
            var coupon = await _couponsRepository.GetByIdAsync(id);
            if (coupon is null)
            {
                return NotFound();
            }

            var user = await _userRepository.GetByIdAsync(dto.User);
            if (user is null)
            {
                return NotFound();
            }

            coupon.Discount = dto.Discount;
            coupon.User = user;

            await _couponsRepository.UpdateAsync(coupon);

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Coupon>> PostCoupon(CouponCreateDTO dto)
        {
            var user = await _userRepository.GetByIdAsync(dto.User);
            if (user is null)
            {
                return NotFound();
            }
            
            var coupon = new Coupon
            {
                Discount = dto.Discount,
                User = user
            };
            
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
















