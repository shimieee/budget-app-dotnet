using System.Text.Json.Serialization;

namespace BudgetApp.Domain.Models;


public class Category
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Order { get; set; }

    public string? UserId { get; set; } 

    [JsonIgnore] 
    public AppUser? User { get; set; }

    public decimal BudgetAmount { get; set; }  

    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    public List<Transaction> Transactions { get; set; } = new();
}