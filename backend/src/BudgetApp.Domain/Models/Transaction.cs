namespace BudgetApp.Domain.Models;

public class Transaction
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public DateTime Date { get; set; }

    public string UserId { get; set; } = default!;  // Change to string
    public AppUser User { get; set; } = default!;

    public int CategoryId { get; set; }
    public Category Category { get; set; } = default!;
}