using BestPizzaBerceni.Models;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace BestPizzaBerceni.Data.Models
{
    public class OrderStatusUpdate
    {
        public int Id { get; set; }
        public string Status { get; set; }
        public DateTime Timestamp { get; set; }

        public int OrderId { get; set; }
        public Order Order { get; set; }         
    }
}