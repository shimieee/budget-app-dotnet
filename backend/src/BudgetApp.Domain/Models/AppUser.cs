using Microsoft.AspNetCore.Identity;

namespace BudgetApp.Domain.Models
{
    public class AppUser : IdentityUser
    {
        // Additional properties for the user
        public required string FullName { get; set; }
        public string? ProfilePictureUrl { get; set; }
        
    }
}