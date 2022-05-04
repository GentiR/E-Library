using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Languages
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
                var language = await _context.Languages.FindAsync(request.Id);

                _context.Remove(language);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}