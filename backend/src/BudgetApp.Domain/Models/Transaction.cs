using System.Text.Json.Serialization;

namespace BudgetApp.Domain.Models;

public enum TransactionType
{
    Income,
    Expense
}
public class Transaction
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public DateTime Date { get; set; }

    public int CategoryId { get; set; }

    [JsonIgnore]
    public string? UserId { get; set; }

    [JsonIgnore]
    public AppUser? User { get; set; }

    [JsonIgnore]
    public Category? Category { get; set; }

    // Optional notes for the transaction
    public string? Notes { get; set; }

    // Optional URL for the receipt image
    public string? ReceiptImageUrl { get; set; }

    // Enum to indicate whether the transaction is income or expense
    public TransactionType Type { get; set; }

}