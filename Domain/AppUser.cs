using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public abstract class AppUser : IdentityUser
    {
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public abstract string Role { get; set; }
    }
}