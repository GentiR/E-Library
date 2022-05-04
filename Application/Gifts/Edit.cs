using MediatR;
using Domain;
using Persistence;
using System.Threading;
using System.Threading.Tasks;
using System;
using AutoMapper;

namespace Application.Gifts
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Gift Gift { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {

        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public Handler(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
        {
            var gift = await _context.Gifts.FindAsync(request.Gift.Id);

            _mapper.Map(request.Gift, gift);
            
            await _context.SaveChangesAsync();

            return Unit.Value;
        }
    }
    }
}