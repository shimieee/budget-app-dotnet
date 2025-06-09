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

    public async Task<IEnumerable<Transaction>> GetByUserIdAsync(int userId)
    {
        return await _context.Transactions
            .Where(t => t.UserId == userId)
            .ToListAsync();
    }

    public async Task<Transaction?> GetByIdAsync(int id)
    {
        return await _context.Transactions.FindAsync(id);
    }

    public async Task AddAsync(Transaction transaction)
    {
        await _context.Transactions.AddAsync(transaction);
    }

    public void Update(Transaction transaction)
    {
        _context.Transactions.Update(transaction);
    }

    public void Delete(Transaction transaction)
    {
        _context.Transactions.Remove(transaction);
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }

    public Task UpdateAsync(Transaction transaction)
    {
        throw new NotImplementedException();
    }

    public Task DeleteAsync(Transaction transaction)
    {
        throw new NotImplementedException();
    }
}