using Microsoft.AspNetCore.Mvc;
using BudgetApp.Application.Interfaces;
using BudgetApp.Domain.Models;

namespace BudgetApp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransactionController : ControllerBase
{
    private readonly ITransactionRepository _transactionRepository;

    public TransactionController(ITransactionRepository transactionRepository)
    {
        _transactionRepository = transactionRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllTransactions()
    {
        var transaction = await _transactionRepository.GetAllAsync();
        return Ok(users);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUserById(int id)
    {
        var user = await _userRepository.GetByIdAsync(id);
        if (user == null) return NotFound();
        return Ok(user);
    }

    [HttpPost]
    public async Task<IActionResult> CreateUser([FromBody] User user)
    {
        await _userRepository.AddAsync(user);
        return CreatedAtAction(nameof(GetUserById), new { id = user.Id }, user);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(int id, [FromBody] User updatedUser)
    {
        var user = await _userRepository.GetByIdAsync(id);
        if (user == null) return NotFound();

        user.Username = updatedUser.Username;
        user.Email = updatedUser.Email;

        await _userRepository.UpdateAsync(user);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        var user = await _userRepository.GetByIdAsync(id);
        if (user == null) return NotFound();

        await _userRepository.DeleteAsync(user);
        return NoContent();
    }
}
