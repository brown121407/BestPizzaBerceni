using System.Collections.Generic;

namespace BestPizzaBerceni.Data.DTOs.Order
{
    public class OrderUpdateDTO
    {
        public int Address { get; set; }
        public List<int> OrderItems { get; set; }
    }
}