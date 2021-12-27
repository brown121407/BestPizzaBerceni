using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BestPizzaBerceni.Data.Models
{
    public class Order
    {
        public int Id { get; set; }

        public int AddressId { get; set; }
        public Address Address { get; set; }
        public ICollection<OrderStatusUpdate> OrderStatusUpdates { get; set; }
        public ICollection<OrderItem> OrderItems { get; set; }
    }
}
