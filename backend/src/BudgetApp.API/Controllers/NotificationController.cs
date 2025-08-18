using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BudgetApp.Application.Interfaces;
using System.Security.Claims;
using System.Text.Json;

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

    [HttpGet]
    public async Task<IActionResult> GetNotifications()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        Console.WriteLine($"User ID: {userId}");
        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized("User is not authenticated.");
        }

        var now = DateTime.UtcNow;
        Console.WriteLine($"Current UTC time: {now}");
        var transactions = await _transactionRepository.GetByUserIdAsync(userId);
        foreach (var t in transactions)
        {
            Console.WriteLine($"Transaction: Id={t.Id}, Title={t.Title}, Amount={t.Amount}, Date={t.Date}, IsRecurring={t.IsRecurring}, RecurrenceEndDate={t.RecurrenceEndDate}, RecurrenceInterval={t.RecurrenceInterval}");
        }

        var notifications = transactions
            .Where(t => t.IsRecurring && (t.RecurrenceEndDate == null || t.RecurrenceEndDate >= now))
            .Select(t => new
            {
                t.Id,
                t.Title,
                t.Amount,
                t.Date,
                RecurrenceInterval = (int?)t.RecurrenceInterval ?? 0 // Serialize enum as number
            })
            .ToList();
        Console.WriteLine($"Notifications count: {notifications.Count}");
        Console.WriteLine($"Notifications: {JsonSerializer.Serialize(notifications)}");

        return Ok(notifications);
    }
}