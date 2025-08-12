using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using BudgetApp.Domain.Models;

namespace BudgetApp.Infrastructure.BackgroundServices
{
    public class RecurringExpenseNotifier : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;

        public RecurringExpenseNotifier(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                using (var scope = _serviceProvider.CreateScope())
                {
                    var dbContext = scope.ServiceProvider.GetRequiredService<BudgetDbContext>();
                    var today = DateTime.UtcNow.Date;

                    // Fetch recurring transactions that are due today
                    var dueTransactions = await dbContext.Transactions
                        .Where(t => t.IsRecurring && t.Date <= today &&
                                    (t.RecurrenceEndDate == null || t.RecurrenceEndDate >= today))
                        .ToListAsync(stoppingToken);

                    foreach (var transaction in dueTransactions)
                    {
                        // Logic to send notifications
                        Console.WriteLine($"Notifying user {transaction.UserId} about transaction {transaction.Title}");

                        // Update the next occurrence of the recurring transaction
                        switch (transaction.RecurrenceInterval)
                        {
                            case RecurrenceInterval.Daily:
                                transaction.Date = transaction.Date.AddDays(1);
                                break;
                            case RecurrenceInterval.Weekly:
                                transaction.Date = transaction.Date.AddDays(7);
                                break;
                            case RecurrenceInterval.Monthly:
                                transaction.Date = transaction.Date.AddMonths(1);
                                break;
                            case RecurrenceInterval.Yearly:
                                transaction.Date = transaction.Date.AddYears(1);
                                break;
                        }

                        dbContext.Transactions.Update(transaction);
                    }

                    await dbContext.SaveChangesAsync(stoppingToken);
                }

                // Wait for a day before checking again
                await Task.Delay(TimeSpan.FromDays(1), stoppingToken);
            }
        }
    }
}