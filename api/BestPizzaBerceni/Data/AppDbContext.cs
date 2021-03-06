using BestPizzaBerceni.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using BestPizzaBerceni.Data.Models;

namespace BestPizzaBerceni.Data
{
    public class AppDbContext : IdentityDbContext<User, Role, int>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.EnableSensitiveDataLogging();
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            
            builder
                .Entity<OrderStatusUpdate>()
                .HasOne(e => e.Order)
                .WithMany(e => e.OrderStatusUpdates)
                .OnDelete(DeleteBehavior.Cascade);

            builder
                .Entity<OrderItem>()
                .HasOne(oi => oi.Coupon)
                .WithOne(c => c.OrderItem)
                .OnDelete(DeleteBehavior.SetNull);
        }
        
        public DbSet<Ingredient> Ingredients { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductVariant> ProductVariants { get; set; }
        public DbSet<Token> Tokens { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderStatusUpdate> OrderStatusUpdates { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<CartItem> CartItems { get; set; }
        public DbSet<Coupon> Coupons { get; set; }
        public DbSet<User> ourUsers { get; set; }
        public DbSet<Role> Roles { get; set; }

    }
}
