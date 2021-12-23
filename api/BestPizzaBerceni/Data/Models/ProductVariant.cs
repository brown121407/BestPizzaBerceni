using BestPizzaBerceni.Data.Models;

namespace BestPizzaBerceni.Models
{
    public class ProductVariant
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Quantity { get; set; }
        public string Unit { get; set; }

        public Product Product { get; set; }
        public CartItem CartItem { get; set; }
        public OrderItem OrderItem { get; set; }
    }
}
