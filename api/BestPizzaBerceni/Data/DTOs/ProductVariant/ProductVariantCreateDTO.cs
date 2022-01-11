namespace BestPizzaBerceni.Data.DTOs.ProductVariant
{
    public class ProductVariantCreateDTO
    {
        public string Name { get; set; }
        public int Quantity { get; set; }
        public string Unit { get; set; }
        public float Price { get; set; }
        
        public int Product { get; set; }
    }
}