using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        //base(options) - konstruktori i super klases.
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Author> Authors { get; set;}
        public DbSet<Language> Languages { get; set;}
        
        public DbSet<Book> Books { get; set;}        
        public DbSet<Gift> Gifts { get; set;}
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>();

            base.OnModelCreating(builder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);
        }
          
        public DbSet<Event> Events { get; set;}      
    }
}