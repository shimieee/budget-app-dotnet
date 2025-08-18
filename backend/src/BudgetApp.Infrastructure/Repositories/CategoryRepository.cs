using BudgetApp.Application.Interfaces;
using BudgetApp.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace BudgetApp.Infrastructure.Repositories;
// used to manage categories in the budget application

public class CategoryRepository : ICategoryRepository
{
    // Repository for managing categories in the budget application
    private readonly BudgetDbContext _context;

    // Constructor to inject the database context
    public CategoryRepository(BudgetDbContext context)
    {
        _context = context;
    }

    // Methods to interact with the database for category operations
    public async Task<IEnumerable<Category>> GetByUserIdAsync(string userId)
    {
        return await _context.Categories
            .Where(c => c.UserId == userId)
            .ToListAsync();
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
        await _context.SaveChangesAsync();

    }

    public async Task UpdateAsync(Category category)
    {
        _context.Categories.Update(category);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Category category)
    {
        _context.Categories.Remove(category);
        await _context.SaveChangesAsync(); // Save changes after delete
    }
    
     public async Task<bool> ExistsAsync(string userId, string name)
    {
        return await _context.Categories
            .AnyAsync(c => c.UserId == userId && c.Name == name);
    }
}