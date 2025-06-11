using BudgetApp.Application.Interfaces;
using BudgetApp.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace BudgetApp.Infrastructure.Repositories;
public class TransactionRepository : ITransactionRepository
{
    private readonly BudgetDbContext _context;

    public TransactionRepository(BudgetDbContext context)
    {
        _context = context;
    }

// get all transactions for a specific user
    public async Task<IEnumerable<Transaction>> GetByUserIdAsync(int userId)
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
// add a new transaction
    public async Task AddAsync(Transaction transaction)
    {
        await _context.Transactions.AddAsync(transaction);
    }
// update an existing transaction
    public Task UpdateAsync(Transaction transaction)
    {
        _context.Transactions.Update(transaction);
        return Task.CompletedTask;        
    }
// delete a transaction
    public Task DeleteAsync(Transaction transaction)
    {
        _context.Transactions.Remove(transaction);
        return Task.CompletedTask;
    }
}