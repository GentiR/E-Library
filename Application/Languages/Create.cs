using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Languages
{
    public class Create
    {
        public class Command : IRequest
        {
           public Language Language { get; set;}
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
                _context.Languages.Add(request.Language);

                await _context.SaveChangesAsync();
             //this does nothing just lets the Api controller know that we finished twhatever is going on here
                return Unit.Value;
            }
        }
    }
}