using MediatR;
using System;
using Persistence;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Books
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
                var book = await _context.Books.FindAsync(request.Id);

                 _context.Remove(book);
 
                 await _context.SaveChangesAsync();
                //equivalent with void.
                return Unit.Value;
            }
        }
    }
}