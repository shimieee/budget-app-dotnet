using Microsoft.AspNetCore.Mvc;
using BudgetApp.Application.Interfaces;
using BudgetApp.Domain.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace BudgetApp.API.Controllers;

// API controller for managing categories
[Authorize]
[ApiController]
[Route("api/[controller]")]
public class CategoryController : ControllerBase
{
    // Repository for category operations
    private readonly ICategoryRepository _categoryRepository;

    public CategoryController(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    // Endpoints for category management
    // Endpoint to get all categories for the authenticated user
    [HttpGet]
    public async Task<IActionResult> GetAllCategories()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var categories = await _categoryRepository.GetByUserIdAsync(userId!);
        return Ok(categories);
    }

    // Endpoint to get a category by ID
    [HttpGet("{id}")]
    public async Task<IActionResult> GetCategoryById(int id)
    {
        // Check if the category exists
        var category = await _categoryRepository.GetByIdAsync(id);
        // If not found, return 404 Not Found
        if (category == null) return NotFound();
        return Ok(category);
    }

    // Endpoint to add a new category
    [HttpPost]
    public async Task<IActionResult> AddCategory([FromBody] Category category)
    {
        // Validate the category
        if (string.IsNullOrWhiteSpace(category.Name))
            return BadRequest("Category name is required.");
        // Check if the budget amount is valid
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null)
            return BadRequest("User ID is required.");
        // Set the user ID and created date for the category
        category.UserId = userId!;
        category.CreatedDate = DateTime.UtcNow;
        // Add the category to the repository
        await _categoryRepository.AddAsync(category);
    
    return CreatedAtAction(nameof(GetCategoryById), new { id = category.Id }, category);
    }

    // Endpoint to update an existing category
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCategory(int id, [FromBody] Category updatedCategory)
    {
        // Validate the updated category
        var category = await _categoryRepository.GetByIdAsync(id);
        if (category == null) return NotFound();

        category.Name = updatedCategory.Name;
        category.BudgetAmount = updatedCategory.BudgetAmount;

        await _categoryRepository.UpdateAsync(category);
        return NoContent();
    }

    // Endpoint to delete a category by ID
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCategory(int id)
    {
        // Check if the category exists
        var category = await _categoryRepository.GetByIdAsync(id);
        if (category == null) return NotFound();
        
        // Delete the category
        await _categoryRepository.DeleteAsync(category);
        return NoContent();
    }
}