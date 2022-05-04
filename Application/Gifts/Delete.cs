using MediatR;
using System;
using Persistence;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Gifts
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var gift = await _context.Gifts.FindAsync(request.Id);

                 _context.Remove(gift);
 
                 await _context.SaveChangesAsync();
                //equivalent with void.
                return Unit.Value;
            }
        }
    }
}