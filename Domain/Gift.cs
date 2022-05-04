using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Gift
    {
        public Guid Id { get; set; }

        public string GiftName { get; set; }

        public double GiftPrice { get; set; }

        public int GiftQuantity { get; set; }

        public string Image { get; set; }

    }
}