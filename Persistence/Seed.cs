using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence {
    public class Seed {
     public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
     {
          
        if (!userManager.Users.Any()){
        
            var users = new List<AppUser>
            {
                new AppUser{DisplayName = "Gent", UserName = "GentRechica", Email = "gent@gmail.com"},               
                new AppUser{DisplayName = "Blerine", UserName = "BlerineRestelica", Email = "blerina@gmail.com"},                
                new AppUser{DisplayName = "Dren", UserName = "DrenHyseni", Email = "dren@gmail.com"}                           
            };

            foreach(var user in users)
            {
                await userManager.CreateAsync(user, "Pa$$w0rd");
            }
        }

       
        if (context.Languages.Any()) return;
        
        var languages = new List<Language>
        {
            new Language
            {
                LanguageName = "Shqip",                
            },
            new Language
            {
                LanguageName = "English",                
            },
            new Language
            {
                LanguageName = "Turqisht",                
            },
            new Language
            {
                LanguageName = "Italisht",                
            },
        };

        if (context.Authors.Any()) return; 

        var authors = new List<Author>
        {   
            new Author
            {
                Name = "Blerine",
                Surname = "Restelica",
                Description = "Blerina was born in Podujeve...",
            },
            new Author
            {
                Name = "Gent ",
                Surname = "Rechica",
                Description = "Genti was born in Lipjan...",
            },
            new Author
            {
                Name = "Dren ",
                Surname = "Hyseni",
                Description = "Dren was born in Ferizaj...",
            },
            new Author
            {
                Name = "Bleona ",
                Surname = "Restelica",
                Description = "Bleona was born in Podujeve...",
            },
            new Author
            {
                Name = "Luna ",
                Surname = "Restelica",
                Description = "Luna was born in Podujeve...",
            },
        };

        if (context.Books.Any()) return; 

        var books = new List<Book>
        {
          new Book
          {
              BookName = "Gjuetari i Balonave",
              PublicationYear = 2003,
              Publisher = "No Clue",
              Price = 15,
              Image = "HarryPotter.png",

          },
            new Book
          {
              BookName = "Gjuetari i Balonave",
              PublicationYear = 2003,
              Publisher = "No Clue",
              Price = 15,
              Image = "HarryPotter.png",
          },
           new Book
          {
              BookName = "Gjuetari i Balonave",
              PublicationYear = 2003,
              Publisher = "No Clue",
              Price = 15,
              Image = "HarryPotter.png",
          },
              new Book
          {
              BookName = "Gjuetari i Balonave",
              PublicationYear = 2003,
              Publisher = "No Clue",
              Price = 15,
              Image = "HarryPotter.png",
          },
             new Book
          {
              BookName = "Gjuetari i Balonave",
              PublicationYear = 2003,
              Publisher = "No Clue",
              Price = 15,
              Image = "HarryPotter.png",
          },
      };

            //GIFT seed
        if (context.Gifts.Any()) return; 

            var gifts = new List<Gift>
            {
            new Gift
            {
               GiftName = "Laps",
               GiftPrice = 1,
               GiftQuantity = 5,
               Image = "laps.png"

            },
                new Gift
            {
                 GiftName = "Laps",
               GiftPrice = 1,
               GiftQuantity = 5,
               Image = "laps.png"
            },
            new Gift
            {
                  GiftName = "Laps",
               GiftPrice = 1,
               GiftQuantity = 5,
               Image = "laps.png"
            },
                new Gift
            {
                  GiftName = "Laps",
               GiftPrice = 1,
               GiftQuantity = 5,
               Image = "laps.png"
            },
                new Gift
            {
                  GiftName = "Laps",
               GiftPrice = 1,
               GiftQuantity = 5,
               Image = "laps.png"
            },
        };
      await context.Authors.AddRangeAsync(authors);
      await context.Books.AddRangeAsync(books);
      await context.Languages.AddRangeAsync(languages);
      await context.Gifts.AddRangeAsync(gifts);
      await context.SaveChangesAsync(); 
      
     }

    }
}

