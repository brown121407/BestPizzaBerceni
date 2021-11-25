using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace BestPizzaBerceni.Models
{
    public class User : IdentityUser<int>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public ICollection<Role> Roles { get; set; }
        public ICollection<Token> Tokens { get; set; }
    }
}
