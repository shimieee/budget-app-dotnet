using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace BudgetApp.Infrastructure
{
    public class BudgetDbContextFactory : IDesignTimeDbContextFactory<BudgetDbContext>
    {
        // This factory is used to create instances of BudgetDbContext at design time, such as during migrations.
        public BudgetDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<BudgetDbContext>();

            // Load environment variables
            DotNetEnv.Env.Load("../../.env");

            var connectionString = $"Host={Environment.GetEnvironmentVariable("DB_HOST")};" +
                       $"Port={Environment.GetEnvironmentVariable("DB_PORT") ?? "5432"};" +
                       $"Database={Environment.GetEnvironmentVariable("DB_NAME")};" +
                       $"Username={Environment.GetEnvironmentVariable("DB_USER")};" +
                       $"Password={Environment.GetEnvironmentVariable("DB_PASS")}";
            // Use Npgsql for PostgreSQL
            optionsBuilder.UseNpgsql(connectionString);
            return new BudgetDbContext(optionsBuilder.Options);
        }
    }
}