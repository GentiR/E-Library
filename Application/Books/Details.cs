using MediatR;
using Domain;
using System;
using Persistence;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Books
{
    public class Details
    {
        public class Query : IRequest<Book>
        {
            public Guid Id { get; set; }
        }

        
        public class Handler : IRequestHandler<Query, Book>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }



            public async Task<Book> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Books.FindAsync(request.Id);
            }
        }
    }
}