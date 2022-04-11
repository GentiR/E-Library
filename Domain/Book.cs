using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Book
    {
        public Guid Id { get; set; }

        public string BookName { get; set; }

        public int PublicationYear { get; set; }

        public string Publisher { get; set; }

    }
}