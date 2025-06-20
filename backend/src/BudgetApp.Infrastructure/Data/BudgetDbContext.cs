using Microsoft.EntityFrameworkCore;
using BudgetApp.Domain.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

//maps models to database tables
public class BudgetDbContext : IdentityDbContext<AppUser>
{
    public BudgetDbContext(DbContextOptions<BudgetDbContext> options)
        : base(options) { }

    public DbSet<Transaction> Transactions => Set<Transaction>();
    public DbSet<Category> Categories => Set<Category>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    base.OnModelCreating(modelBuilder);

    modelBuilder.Entity<Category>()
        .HasOne(c => c.User)
        .WithMany()
        .HasForeignKey(c => c.UserId)
        .OnDelete(DeleteBehavior.Cascade);

    modelBuilder.Entity<Transaction>()
        .HasOne(t => t.User)
        .WithMany()
        .HasForeignKey(t => t.UserId)
        .OnDelete(DeleteBehavior.Cascade);
}
}