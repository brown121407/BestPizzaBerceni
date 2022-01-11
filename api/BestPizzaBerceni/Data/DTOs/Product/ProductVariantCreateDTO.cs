using System.Collections.Generic;

namespace BestPizzaBerceni.Data.DTOs.Product
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