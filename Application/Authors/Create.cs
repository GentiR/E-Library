using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Authors
{
    public class Create
    {
        public class Command : IRequest
        {
           public Author Author { get; set;}
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
                _context.Authors.Add(request.Author);

                await _context.SaveChangesAsync();
             //this does nothing just lets the Api controller know that we finished twhatever is going on here
                return Unit.Value;
            }
        }
    }
}