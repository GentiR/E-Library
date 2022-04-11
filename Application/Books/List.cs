using MediatR;
using System.Collections.Generic;
using Domain;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Threading;
using System.Threading.Tasks;


namespace Application.Books
{
    public class List
    {
        public class Query : IRequest<List<Book>>{}

        public class Handler : IRequestHandler<Query, List<Book>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }


            public async Task<List<Book>> Handle(Query request, CancellationToken cancellationToken)
            {
  
                return await _context.Books.ToListAsync(cancellationToken);
            }
        }

    }
}