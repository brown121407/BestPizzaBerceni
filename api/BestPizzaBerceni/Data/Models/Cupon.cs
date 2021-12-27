using BestPizzaBerceni.Models;

namespace BestPizzaBerceni.Data.Models
{
    public class Cupon
    {
        public int Sale { get; set; }

        public User User { get; set; }
        public OrderItem OrderItem { get; set; }
    }
}