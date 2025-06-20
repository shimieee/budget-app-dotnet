using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BudgetApp.Application.Interfaces;
using BudgetApp.Domain.Models;
using System.Security.Claims;

namespace BudgetApp.API.Controllers;

// API controller for managing transactions
[Authorize]
[ApiController]
[Route("api/[controller]")]
public class TransactionController : ControllerBase
{
    // Repositories for transaction and category operations
    private readonly ITransactionRepository _transactionRepository;
    private readonly ICategoryRepository _categoryRepository;

    // Constructor to inject the repositories
    public TransactionController(
        ITransactionRepository transactionRepository,
        ICategoryRepository categoryRepository)
    {
        _transactionRepository = transactionRepository;
        _categoryRepository = categoryRepository;
    }

    // Endpoints for transaction management
    // Endpoint to get all transactions for the authenticated user
    [HttpGet]
    public async Task<IActionResult> GetUserTransactions()
    {
        // Get the user ID from the claims
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userId))
            return Unauthorized();
        // Fetch transactions for the user
        var transactions = await _transactionRepository.GetByUserIdAsync(userId!);

        return Ok(transactions);
    }

    // Endpoint to get a transaction by ID
    [HttpGet("{id}")]
    public async Task<IActionResult> GetTransaction(int id)
    {
        var transaction = await _transactionRepository.GetByIdAsync(id);
        return transaction == null ? NotFound() : Ok(transaction);
    }

    // Endpoint to create a new transaction
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Transaction transaction)
    {
        // Validate the transaction
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        // Check if the transaction has a valid amount and title
        if (string.IsNullOrEmpty(userId))
            return Unauthorized();

        // Assign UserId and ensure Date is in UTC
        transaction.UserId = userId;
        transaction.Date = DateTime.SpecifyKind(transaction.Date, DateTimeKind.Utc);

        // Validate Category exists (optional but recommended)
        var category = await _categoryRepository.GetByIdAsync(transaction.CategoryId);
        if (category == null)
            return BadRequest("Invalid CategoryId.");

        await _transactionRepository.AddAsync(transaction);
        await _transactionRepository.SaveChangesAsync(); // ensure saving changes

        return CreatedAtAction(nameof(GetTransaction), new { id = transaction.Id }, transaction);
    }

// Endpoint to update an existing transaction
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] Transaction transaction)
    {
        // Validate the transaction
        var existing = await _transactionRepository.GetByIdAsync(id);
        if (existing == null) return NotFound();

        // Check if the transaction has a valid amount and title
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var category = await _categoryRepository.GetByIdAsync(transaction.CategoryId);
        if (category == null) return BadRequest("Invalid CategoryId.");

        // Update the existing transaction
        existing.Title = transaction.Title;
        existing.Amount = transaction.Amount;
        existing.Date = transaction.Date;
        existing.CategoryId = transaction.CategoryId;
        existing.UserId = userId!;
        
        // Update the transaction in the repository
        await _transactionRepository.UpdateAsync(existing);
        return Ok(existing);
    }

    // Endpoint to delete a transaction by ID
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        // Check if the transaction exists
        var transaction = await _transactionRepository.GetByIdAsync(id);
        if (transaction == null) return NotFound();
        // Delete the transaction
        await _transactionRepository.DeleteAsync(transaction);
        return NoContent();
    }
}