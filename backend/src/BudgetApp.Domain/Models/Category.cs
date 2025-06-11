namespace BudgetApp.Domain.Models;

public class Category
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;

    // Foreign Key
    public int UserId { get; set; }
    public User User { get; set; } = default!;
    public int Order { get; set; }
    public List<Transaction> Transactions { get; set; } = [];
}
