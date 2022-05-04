using MediatR;
using System.Collections.Generic;
using Domain;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Threading;
using System.Threading.Tasks;


namespace Application.Gifts
{
    public class List
    {
        public class Query : IRequest<List<Gift>>{}

        public class Handler : IRequestHandler<Query, List<Gift>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }


            public async Task<List<Gift>> Handle(Query request, CancellationToken cancellationToken)
            {
  
                return await _context.Gifts.ToListAsync(cancellationToken);
            }
        }

    }
}