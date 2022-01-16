namespace BestPizzaBerceni.Data.DTOs.CartItem
{
    public class CartItemUpdateDTO
    {
        public int Quantity { get; set; }

        public int User { get; set; }
        public int ProductVariant { get; set; }
    }
}