using Microsoft.AspNetCore.Identity;

namespace BudgetApp.Domain.Models
{
    public class AppUser : IdentityUser
    {
        // Additional properties can be added here if needed
        // For example, you might want to add a full name or profile picture URL
        public required string FullName { get; set; }
        public string? ProfilePictureUrl { get; set; }
        
    }
}