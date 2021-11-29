using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace BestPizzaBerceni.Data.Models
{
    public class Role : IdentityRole<int>
    {
        public ICollection<User> Users { get; set; }
    }
}
