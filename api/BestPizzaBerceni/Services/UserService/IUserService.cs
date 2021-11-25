#nullable enable
using System.Threading.Tasks;
using BestPizzaBerceni.Data.DTOs;
using Microsoft.AspNetCore.Identity;

namespace BestPizzaBerceni.Services.UserService
{
    public interface IUserService
    {
        public Task<IdentityResult> RegisterUserAsync(RegisterUserDTO dto);
        public Task<string?> LoginUserAsync(LoginUserDTO dto);
    }
}