using BudgetApp.Application.Interfaces;
using BudgetApp.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace BudgetApp.Infrastructure.Repositories;

public class TransactionRepository : ITransactionRepository
{
    // Repository for managing transactions in the budget application
    private readonly BudgetDbContext _context;

    // Constructor to inject the database context
    public TransactionRepository(BudgetDbContext context)
    {
        _context = context;
    }

    // get all transactions for a specific user
    public async Task<IEnumerable<Transaction>> GetByUserIdAsync(string userId)
    {
        return await _context.Transactions
                         .Where(t => t.UserId == userId)
                         .ToListAsync();
    }

    // get a specific transaction by id
    public async Task<Transaction?> GetByIdAsync(int id)
    {
        return await _context.Transactions.FindAsync(id);
    }
    // get all transactions
    public async Task AddAsync(Transaction transaction)
    {
        await _context.Transactions.AddAsync(transaction);
        await _context.SaveChangesAsync();
    }
    // update an existing transaction
    public async Task UpdateAsync(Transaction transaction)
    {
        var existingTransaction = await _context.Transactions.FindAsync(transaction.Id);
        if (existingTransaction != null)
        {
            existingTransaction.Title = transaction.Title;
            existingTransaction.Amount = transaction.Amount;
            existingTransaction.Date = transaction.Date;
            existingTransaction.CategoryId = transaction.CategoryId;
            existingTransaction.Type = transaction.Type; // Update TransactionType
            existingTransaction.Notes = transaction.Notes; // Update Notes
            existingTransaction.ReceiptImageUrl = transaction.ReceiptImageUrl; // Update ReceiptImageUrl
            existingTransaction.IsRecurring = transaction.IsRecurring; // Update IsRecurring
            existingTransaction.RecurrenceInterval = transaction.RecurrenceInterval; // Update RecurrenceInterval
            existingTransaction.RecurrenceEndDate = transaction.RecurrenceEndDate; // Update RecurrenceEndDate

            _context.Transactions.Update(existingTransaction);
            await _context.SaveChangesAsync();
        }
    }
    // delete a transaction
    public async Task DeleteAsync(Transaction transaction)
    {
        _context.Transactions.Remove(transaction);
        await _context.SaveChangesAsync();
    }
    // save changes to the database
    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
    public async Task<bool> ExistsForCategoryAsync(int categoryId)
    {
        return await _context.Transactions
            .AnyAsync(t => t.CategoryId == categoryId);
    }
}