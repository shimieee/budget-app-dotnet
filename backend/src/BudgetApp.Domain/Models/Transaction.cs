using System.Text.Json.Serialization;

namespace BudgetApp.Domain.Models;

public enum TransactionType
{
    Income,
    Expense
}

public enum RecurrenceInterval
{
    Daily,
    Weekly,
    Monthly,
    Yearly
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

    //  properties for recurring transactions
    public bool IsRecurring { get; set; } // Indicates if the transaction is recurring
    public RecurrenceInterval? RecurrenceInterval { get; set; } // Frequency of recurrence
    public DateTime? RecurrenceEndDate { get; set; } // Optional end date for recurrence

}