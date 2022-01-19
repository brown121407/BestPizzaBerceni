namespace BestPizzaBerceni.Data.DTOs.CartItem
{
    public class CartItemCreateDTO
    {
        public int Quantity { get; set; }

        public int User { get; set; }
        public int ProductVariant { get; set; }
    }
}