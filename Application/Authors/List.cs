using System.Collections.Generic;
using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Authors
{

    public class List
    {
  public class Query : IRequest<List<Author>> {}

  public class Handler : IRequestHandler<Query, List<Author>>
  {
        private readonly DataContext _context;
      public Handler(DataContext context)
      {
            _context = context;

      }

      public async Task<List<Author>> Handle(Query request, CancellationToken cancellationToken)
      {
         return await _context.Authors.ToListAsync();
      }
  }
    }
}