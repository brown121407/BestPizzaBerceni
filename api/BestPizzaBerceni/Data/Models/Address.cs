using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using BestPizzaBerceni.Data.Models;
using BestPizzaBerceni.Models;
namespace BestPizzaBerceni.Data.Models
{
    public class Address
    {
        public int Id { get; set; }
        public string County { get; set; }
        public string City { get; set; }
        public string AddressLine { get; set; }
        public string PostalCode { get; set; }
        public string PhoneNumber { get; set; }

        [Required]
        public User User { get; set; }
        public ICollection<Order> Orders { get; set; }
    }
}
