using System.Collections.Generic;

namespace BestPizzaBerceni.Data.Models
{
    public class Ingredient
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool Allergen { get; set; }
        public bool Spicy { get; set; }

        public ICollection<Product> Products { get; set; }
    }
}
