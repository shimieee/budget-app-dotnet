using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BudgetApp.Application.Interfaces;
using BudgetApp.Domain.Models;
using System.Security.Claims;

namespace BudgetApp.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class TransactionController : ControllerBase
{
    private readonly ITransactionRepository _transactionRepository;
    private readonly ICategoryRepository _categoryRepository;

    public TransactionController(
        ITransactionRepository transactionRepository,
        ICategoryRepository categoryRepository)
    {
        _transactionRepository = transactionRepository;
        _categoryRepository = categoryRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetUserTransactions()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var transactions = await _transactionRepository.GetByUserIdAsync(userId!);
        return Ok(transactions);
    }
 
    [HttpGet("{id}")]
    public async Task<IActionResult> GetTransaction(int id)
    {
        var transaction = await _transactionRepository.GetByIdAsync(id);
        return transaction == null ? NotFound() : Ok(transaction);
    }

    [HttpPost]
public async Task<IActionResult> Create([FromBody] Transaction transaction)
{
    var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

    var category = await _categoryRepository.GetByIdAsync(transaction.CategoryId);
    if (category == null) return BadRequest("Invalid CategoryId.");

    transaction.UserId = userId!;
    await _transactionRepository.AddAsync(transaction);

    return CreatedAtAction(nameof(GetTransaction), new { id = transaction.Id }, transaction);
}

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] Transaction transaction)
    {
        var existing = await _transactionRepository.GetByIdAsync(id);
        if (existing == null) return NotFound();

        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var category = await _categoryRepository.GetByIdAsync(transaction.CategoryId);
        if (category == null) return BadRequest("Invalid CategoryId.");

        existing.Title = transaction.Title;
        existing.Amount = transaction.Amount;
        existing.Date = transaction.Date;
        existing.CategoryId = transaction.CategoryId;
        existing.UserId = userId!;

        await _transactionRepository.UpdateAsync(existing);
        return Ok(existing);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var transaction = await _transactionRepository.GetByIdAsync(id);
        if (transaction == null) return NotFound();

        await _transactionRepository.DeleteAsync(transaction);
        return NoContent();
    }
}