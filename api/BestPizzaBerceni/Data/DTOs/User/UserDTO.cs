using System.Collections.Generic;
using BestPizzaBerceni.Data.Models;

namespace BestPizzaBerceni.Data.DTOs.User
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public List<string> Roles { get; set; }
    }
}