using MediatR;
using Domain;
using Persistence;
using System.Threading;
using System.Threading.Tasks;
using System;

namespace Application.Gifts
{
    public class Create
    {
        //Querys return data, Command don't.
        public class Command : IRequest
        {
            public Gift Gift { get; set; }
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
                _context.Gifts.Add(request.Gift);

                await _context.SaveChangesAsync();
                //equivalent with void.
                return Unit.Value;
            }
        }
    }
}