using BookSale.Management.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BookSale.Management.DataAccess.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, IdentityRole, string>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
              : base(options)
        {}

        public DbSet<Genre> Genre { get; set; }
        public DbSet<Book> Book { get; set; }
        public DbSet<BookCatalogue> BookCatalogue { get; set; }
        public DbSet<BookImages> BookImages { get; set; }
        public DbSet<Cart> Cart { get; set; }
        public DbSet<CartDetail> CartDetail { get; set; }
        public DbSet<Catalogue> Catalogue { get; set; }
        public DbSet<UserAddress> UserAddress { get; set; }
        public DbSet<Order> Order { get; set; }
        public DbSet<OrderDetail> OrderDetail { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ApplicationUser>().ToTable("ApplicationUser");
            builder.Entity<IdentityRole>().ToTable("ApplicationRole");
            builder.Entity<IdentityUserRole<string>>().ToTable("UserRole");
            builder.Entity<IdentityUserClaim<string>>().ToTable("UserClaim");
            builder.Entity<IdentityUserLogin<string>>().ToTable("UserLogin");
            builder.Entity<IdentityRoleClaim<string>>().ToTable("RoleClaim"); //AspNetUserLogin
            builder.Entity<IdentityUserToken<string>>().ToTable("UserToken");

            //Seed Data
            //builder.Entity<ApplicationUser>().HasData(
            //    new ApplicationUser { },
            //    new ApplicationUser { }
            //);
        }
    }
}
