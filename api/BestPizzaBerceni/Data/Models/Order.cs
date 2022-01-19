using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BestPizzaBerceni.Data.Models
{
    public class Order
    {
        public int Id { get; set; }

        [Required]
        public Address Address { get; set; }
        public ICollection<OrderStatusUpdate> OrderStatusUpdates { get; set; }
        public ICollection<OrderItem> OrderItems { get; set; }
    }
}
