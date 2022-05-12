using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Events
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Event Event { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
            _mapper = mapper;
            _context = context;
            }

            public  async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
               var eventt = await _context.Events.FindAsync(request.Event.Id);

               _mapper.Map(request.Event, eventt);

               await _context.SaveChangesAsync();

               return Unit.Value;
            }
        }
    }
}