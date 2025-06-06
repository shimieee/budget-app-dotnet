using BudgetApp.Application.Interfaces;
using BudgetApp.Domain.Models;


namespace BudgetApp.Infrastructure.Repositories;

public interface ICategoryRepository
{
    Task<IEnumerable<Category>> GetAllAsync();
    Task<Category?> GetByIdAsync(int id);
    Task AddAsync(Category category);
    void Update(Category category);
    void Delete(Category category);
    Task SaveChangesAsync();
}
