using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Authors
{
    public  class Details
    {
        public class Query : IRequest<Author>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Author>
        {
        private readonly DataContext _context;
            public Handler(DataContext context)
            {
            _context = context;
             
            }

            public async Task<Author> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Authors.FindAsync(request.Id);
            }
        }
    }
}