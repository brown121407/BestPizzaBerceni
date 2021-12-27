using BestPizzaBerceni.Models;

namespace BestPizzaBerceni.Data.Models
{
    public class OrderItem
    {
        public Cupon Cupon { get; set; }
        public ProductVariant ProductVariant { get; set; }
        public Order Order { get; set; }
    }
}