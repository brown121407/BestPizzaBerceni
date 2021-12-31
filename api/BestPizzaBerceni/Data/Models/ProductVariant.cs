using System.Collections.Generic;
using BestPizzaBerceni.Data.Models;

namespace BestPizzaBerceni.Models
{
    public class ProductVariant
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Quantity { get; set; }
        public string Unit { get; set; }
        public float Price { get; set; }

        public Product Product { get; set; }
        public ICollection<CartItem> CartItems { get; set; }
        public ICollection<OrderItem> OrderItems { get; set; }
    }
}
