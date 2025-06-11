namespace BudgetApp.Domain.Models;

public class User
{
    public int Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;

   // Navigation
    public List<Transaction> Transactions { get; set; } = [];
    public List<Category> Categories { get; set;} = [];
}