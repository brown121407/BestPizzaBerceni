using BestPizzaBerceni.Models;

namespace BestPizzaBerceni.Data.Models
{
    public class CartItem
    {
        public int Quantity { get; set; }
        
        public ProductVariant ProductVariant { get; set; }
        public User User { get; set; }
    }
}