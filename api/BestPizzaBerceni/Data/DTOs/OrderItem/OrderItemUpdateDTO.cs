namespace BestPizzaBerceni.Data.DTOs.OrderItem
{
    public class OrderItemUpdateDTO
    {
        public int Quantity { get; set; }
        
        public int ProductVariant { get; set; }
        public int Order { get; set; }
    }
}