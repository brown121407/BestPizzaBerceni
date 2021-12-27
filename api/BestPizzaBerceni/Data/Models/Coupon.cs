using System.ComponentModel.DataAnnotations;
using BestPizzaBerceni.Models;

namespace BestPizzaBerceni.Data.Models
{
    public class Coupon
    {
        public int Id { get; set; }
        [Range(0, 100)]
        public int Discount { get; set; }

        public User User { get; set; }
        public OrderItem OrderItem { get; set; }
    }
}