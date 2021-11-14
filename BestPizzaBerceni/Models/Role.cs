using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace BestPizzaBerceni.Models
{
    public class Role : IdentityRole<int>
    {
        public ICollection<User> Users { get; set; }
    }
}
