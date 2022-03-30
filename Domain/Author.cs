using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Author
    {
        public Guid Id { get; set; }
        public string Name { get; set;}
        public string Surname { get; set;}
        public string Description { get; set;}
        
    }
} 