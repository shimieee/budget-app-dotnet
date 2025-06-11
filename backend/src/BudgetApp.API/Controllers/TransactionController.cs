using Microsoft.AspNetCore.Mvc;
using BudgetApp.Application.Interfaces;
using BudgetApp.Domain.Models;

namespace BudgetApp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransactionController : ControllerBase
{
    // Repositories for User and Category to validate UserId and CategoryId in transactions
    private readonly IUserRepository _userRepository;
    private readonly ICategoryRepository _categoryRepository;
    private readonly ITransactionRepository _transactionRepository;

    // Constructor to inject the repositories
    public TransactionController(ITransactionRepository transactionRepository
        , IUserRepository userRepository
        , ICategoryRepository categoryRepository)
    {
        _userRepository = userRepository;
        _categoryRepository = categoryRepository;
        _transactionRepository = transactionRepository;
    }


    [HttpGet]
    // Retrieves all transactions for a specific user
    public async Task<IActionResult> GetByUserIdAsync(int userId)
    {
        var transactions = await _transactionRepository.GetByUserIdAsync(userId);
        if (transactions == null || !transactions.Any())
        {
            return NotFound();
        }
        return Ok(transactions);
    }


    [HttpGet("{id}")]
    // Retrieves a specific transaction by its ID
    public async Task<IActionResult> GetByIdAsync(int id)
    {
        var transaction = await _transactionRepository.GetByIdAsync(id);
        if (transaction == null) return NotFound();
        return Ok(transaction);
    }

    [HttpPost]
    // Creates a new transaction for a user
    public async Task<IActionResult> CreateTransaction([FromBody] Transaction transaction)
    {
        // Validate UserId and CategoryId
        var user = await _userRepository.GetByIdAsync(transaction.UserId);
        // Check if the user exists
        if (user == null)
        {
            return BadRequest("Invalid UserId.");
        }

        // Check if the category exists
        var category = await _categoryRepository.GetByIdAsync(transaction.CategoryId);
        if (category == null)
        {
            return BadRequest("Invalid CategoryId.");
        }
        // Set the User and Category properties
        await _transactionRepository.AddAsync(transaction);
        return CreatedAtAction(nameof(GetByIdAsync), new { id = transaction.Id }, transaction);
    }

    [HttpPut("{id}")]
    // Updates an existing transaction
    public async Task<IActionResult> UpdateTransaction(int id, [FromBody] Transaction transaction)
    {
        var existingTransaction = await _transactionRepository.GetByIdAsync(id);
        if (existingTransaction == null)
        {
            return NotFound();
        }
        // Validate UserId and CategoryId
        var user = await _userRepository.GetByIdAsync(transaction.UserId);
        if (user == null)
        {
            return BadRequest("Invalid UserId.");
        }
        var category = await _categoryRepository.GetByIdAsync(transaction.CategoryId);
        if (category == null)
        {
            return BadRequest("Invalid CategoryId.");
        }
        // Update the existing transaction
        existingTransaction.Amount = transaction.Amount;
        existingTransaction.Title = transaction.Title;
        existingTransaction.Date = transaction.Date;
        existingTransaction.UserId = transaction.UserId;
        existingTransaction.CategoryId = transaction.CategoryId;
        await _transactionRepository.UpdateAsync(existingTransaction);

        return Ok(existingTransaction); // Return the updated transaction
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTransaction(int id)
    {
        var transaction = await _transactionRepository.GetByIdAsync(id);
        if (transaction == null)
        {
            return NotFound();
        }
        await _transactionRepository.DeleteAsync(transaction);
        return NoContent(); // Return 204 No Content on successful deletion
    }
}
