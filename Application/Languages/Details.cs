using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Languages
{
    public class Details
    {
        public class Query : IRequest<Language>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Language>
        {
        private readonly DataContext _context;
            public Handler(DataContext context)
            {
            _context = context;
             
            }

            public async Task<Language> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Languages.FindAsync(request.Id);
            }
        }
    }
}