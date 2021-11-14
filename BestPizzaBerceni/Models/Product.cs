using System.Collections.Generic;

namespace BestPizzaBerceni.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<Ingredient> Ingredients { get; set; }
    }
}
