using System.Collections.Generic;

namespace BestPizzaBerceni.Data.DTOs.Product
{
    public class ProductUpdateDTO
    {
        public string Name { get; set; }

        public List<int> Ingredients { get; set; }
        public List<int> ProductVariants { get; set; }
    }
}