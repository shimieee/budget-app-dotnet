namespace BudgetApp.Domain.Models;

public class Transaction
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public DateTime Date { get; set; }

    // Foreign Key
    public int UserId { get; set; }
    public User User { get; set; } = default!;

    public int CategoryId { get; set; }
    public Category Category { get; set; } = default!;
}
