using MediatR;
using Domain;
using System;
using Persistence;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Gifts
{
    public class Details
    {
        public class Query : IRequest<Gift>
        {
            public Guid Id { get; set; }
        }

        
        public class Handler : IRequestHandler<Query, Gift>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }



            public async Task<Gift> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Gifts.FindAsync(request.Id);
            }
        }
    }
}