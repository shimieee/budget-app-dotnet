namespace BudgetApp.Domain.Models;

public class Category
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Order { get; set; }

    public string UserId { get; set; } = default!;  // Change to string
    public AppUser User { get; set; } = default!;

    public List<Transaction> Transactions { get; set; } = new();
}