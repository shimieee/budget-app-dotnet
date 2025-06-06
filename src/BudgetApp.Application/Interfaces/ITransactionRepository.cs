using BudgetApp.Application.Interfaces;
using BudgetApp.Domain.Models;

namespace BudgetApp.Application.Interfaces;

public interface ITransactionRepository
{
    Task<IEnumerable<Transaction>> GetByUserIdAsync(int userId);
    Task<Transaction?> GetByIdAsync(int id);
    Task AddAsync(Transaction transaction);
    void Update(Transaction transaction);
    void Delete(Transaction transaction);
    Task SaveChangesAsync();
}
