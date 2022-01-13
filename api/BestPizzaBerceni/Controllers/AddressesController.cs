using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BestPizzaBerceni.Data;
using BestPizzaBerceni.Data.DTOs.Address;
using BestPizzaBerceni.Data.Models;
using BestPizzaBerceni.Repositories;
using BestPizzaBerceni.Repositories.UserRepository;

namespace BestPizzaBerceni.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressesController : ControllerBase
    {
        private readonly IRepository<Address, int> _addressRepository;
        private readonly IUserRepository _userRepository;
         
        public AddressesController(IRepository<Address, int> addressRepository, IUserRepository userRepository  )
        {
            _addressRepository = addressRepository;
            _userRepository = userRepository;
        }

        // GET: api/Addresses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Address>>> GetAddress()
        {
            return await _addressRepository.GetAllAsync();
        }

        // GET: api/Addresses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Address>> GetAddress(int id)
        {
            var address = await _addressRepository.GetByIdAsync(id);

            if (address == null)
            {
                return NotFound();
            }

            return address;
        }

        // PUT: api/Addresses/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAddress(int id, AddressUpdateDTO dto)
        {
            var address = await _addressRepository.GetByIdAsync(id);
            if (address is null)
            {
                return NotFound();
            }

            var user = await _userRepository.GetByIdAsync(dto.User);
            if (user is null)
            {
                return NotFound();
            }

            address.Id = dto.Id; 
            address.County = dto.County;
            address.City = dto.City;
            address.AddressLine = dto.AddressLine;
            address.PostalCode = dto.PostalCode;
            address.PhoneNumber = dto.PhoneNumber;
            address.User = user;
            
            await _addressRepository.UpdateAsync(address);

            return Ok(address);
        }

        // POST: api/Addresses
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        /*public async Task<ActionResult<Address>> PostAddress(Address address)
        {
            await _addressRepository.CreateAsync(address);

            return CreatedAtAction("GetAddress", new { id = address.Id }, address);
        }*/
        public async Task<ActionResult<Address>> PostAddress(AddressCreateDTO dto)
        {
            var user = await _userRepository.GetByIdAsync(dto.User);
            if (user is null)
            {
                return NotFound();
            }

            var address = new Address
            {
                Id = dto.Id,
                County = dto.County,
                City = dto.City,
                AddressLine = dto.AddressLine,
                PostalCode = dto.PostalCode,
                PhoneNumber = dto.PhoneNumber,
                User = user
            };
            await _addressRepository.CreateAsync(address);

            return CreatedAtAction("GetAddress", new {id = address.Id}, address);
        }
        
        // DELETE: api/Addresses/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAddress(int id)
        {
            var address = await _addressRepository.GetByIdAsync(id);
            if (address == null)
            {
                return NotFound();
            }

            await _addressRepository.DeleteAsync(address);

            return NoContent();
        }
    }
}
