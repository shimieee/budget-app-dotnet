
//maps models to database tables
public class BudgetDbContext : DbContext
{
    public BudgetDbContext(DbContextOptions<BudgetDbContext> options)
        : base(options) { }

    // DbSets for each model
    public DbSet<User> Users => Set<User>();
    public DbSet<Transaction> Transactions => Set<Transaction>();
    public DbSet<Category> Categories => Set<Category>();

    // Optional: Override OnConfiguring if you need to set up the database connection
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Fluent API config if needed
        base.OnModelCreating(modelBuilder);
    }
}

