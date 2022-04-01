using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using MediatR;
using Application.Authors;

namespace API.Controllers
{
    public class AuthorsController : BaseApiController
    {
        private readonly IMediator _mediator;
        
        public AuthorsController(IMediator mediator)
        {
            _mediator = mediator;
            
        }

        [HttpGet]

        public async Task<ActionResult<List<Author>>> GetAuthors(){
            return await _mediator.Send(new List.Query{});
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Author>> GetAuthors(Guid id){
           return Ok();
        }
   }
}