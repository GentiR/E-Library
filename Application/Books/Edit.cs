using MediatR;
using Domain;
using Persistence;
using System.Threading;
using System.Threading.Tasks;
using System;
using AutoMapper;

namespace Application.Books
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Book Book { get; set; }
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
            var book = await _context.Books.FindAsync(request.Book.Id);

            _mapper.Map(request.Book, book);
            
            await _context.SaveChangesAsync();

            return Unit.Value;
        }
    }
    }
}