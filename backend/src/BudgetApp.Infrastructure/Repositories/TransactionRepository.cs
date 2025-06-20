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
        _context.Transactions.Update(transaction);
        await _context.SaveChangesAsync(); 
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
}