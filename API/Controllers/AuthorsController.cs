using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class AuthorsController : BaseApiController
    {
        private readonly DataContext _context;
        public AuthorsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]

        public async Task<ActionResult<List<Author>>> GetAuthors(){
            return await _context.Authors.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Author>> GetAuthors(Guid id){
           return await _context.Authors.FindAsync(id);
        }
   }
}