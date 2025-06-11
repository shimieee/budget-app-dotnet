using BudgetApp.Application.Interfaces;
using BudgetApp.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace BudgetApp.Infrastructure.Repositories;
// used to manage categories in the budget application

public class CategoryRepository : ICategoryRepository
{
    private readonly BudgetDbContext _context;

    public CategoryRepository(BudgetDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Category>> GetAllAsync()
    {
        return await _context.Categories.ToListAsync();
    }

    public async Task<Category?> GetByIdAsync(int id)
    {
        return await _context.Categories.FindAsync(id);
    }

    public async Task AddAsync(Category category)
    {
        await _context.Categories.AddAsync(category);
    }

    public async Task UpdateAsync(Category category)
    {
        _context.Categories.Update(category);
        await Task.CompletedTask;
    }

    public async Task DeleteAsync(Category category)
    {
        _context.Categories.Remove(category);
        await Task.CompletedTask;
    }


}