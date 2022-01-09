using System.Collections.Generic;
using BestPizzaBerceni.Models;

namespace BestPizzaBerceni.Data.DTOs
{
    public class ProductDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<Ingredient> Ingredients { get; set; }
        public ICollection<ProductVariant> ProductVariants { get; set; }
    }
}