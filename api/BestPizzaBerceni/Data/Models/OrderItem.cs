using BestPizzaBerceni.Models;

namespace BestPizzaBerceni.Data.Models
{
    public class OrderItem
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        
        public int? CouponId { get; set; }
        public Coupon Coupon { get; set; }
        public ProductVariant ProductVariant { get; set; }
        public Order Order { get; set; }
    }
}