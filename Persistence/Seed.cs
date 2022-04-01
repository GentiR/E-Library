using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence {
    public class Seed {
     public static async Task SeedData(DataContext context)
     {
      if (context.Authors.Any()) return; 
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



      await context.Languages.AddRangeAsync(languages);
      await context.Authors.AddRangeAsync(authors);
      await context.SaveChangesAsync(); 
     }

    }
}

