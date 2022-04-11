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
        public DbSet<ContactForm> ContactForm { get; set;}
        
        public DbSet<Book> Books { get; set;}        
    }
}