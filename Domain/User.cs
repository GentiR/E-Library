using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class User : AppUser
    {
        public override string Role { get; set; }
    }
}
