using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using BestPizzaBerceni.Data.Models;

namespace BestPizzaBerceni.Models
{
    public class User : IdentityUser<int>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public ICollection<Role> Roles { get; set; }
        public ICollection<Token> Tokens { get; set; }
        public ICollection<Address> Addresses { get; set; }
        public ICollection<CartItem> CartItems { get; set; }
        public ICollection<Coupon> Coupons { get; set; }
    }
}
