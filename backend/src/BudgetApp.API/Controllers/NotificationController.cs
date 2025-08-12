using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BudgetApp.Application.Interfaces;
using System.Security.Claims;
using System.Linq;
using System.Collections.Generic;

namespace BudgetApp.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class NotificationController : ControllerBase
{
    private readonly ITransactionRepository _transactionRepository;

    public NotificationController(ITransactionRepository transactionRepository)
    {
        _transactionRepository = transactionRepository;
    }

    // Endpoint to get notifications for recurring expenses
    [HttpGet]
    public async Task<IActionResult> GetNotifications()
    {
        // Get the user ID from the JWT claims
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized("User is not authenticated.");
        }

        var now = DateTime.UtcNow;

        var transactions = await _transactionRepository.GetByUserIdAsync(userId);
        // Fetch recurring transactions that are due today
        var notifications = transactions
            .Where(t => t.IsRecurring && t.Date > now
            && (t.RecurrenceEndDate == null || t.RecurrenceEndDate >= now))
            .Select(t => new
            {
                t.Id,
                t.Title,
                t.Amount,
                t.Date,
                t.RecurrenceInterval
            })
            .ToList();

        return Ok(notifications);
    }
}