using System;
using System.ComponentModel.DataAnnotations;

namespace BestPizzaBerceni.Data.Models
{
    public class Token
    {
        [Key]
        public string Jti { get; set; }
        [Required]
        public DateTime ExpirationDate { get; set; }

        [Required]
        public int UserId { get; set; }
        public User User { get; set; }
    }
}