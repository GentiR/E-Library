using System.Collections.Generic;
using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Languages
{
    public class List
    {
        public class Query : IRequest<List<Language>> {}

        public class Handler : IRequestHandler<Query, List<Language>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Language>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Languages.ToListAsync();
            }
        }
    }
}
