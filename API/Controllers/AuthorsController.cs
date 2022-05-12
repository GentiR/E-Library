using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.Authors;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [AllowAnonymous]
    public class AuthorsController : BaseApiController
    {
        [HttpGet]

        public async Task<ActionResult<List<Author>>> GetAuthors(){
            return await Mediator.Send(new List.Query{});
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Author>> GetAuthor(Guid id){
          return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<IActionResult> CreateAuthor(Author author)
        {
            return Ok(await Mediator.Send(new Create.Command{Author = author}));
        }
        
        [HttpPut("{id}")]
        public async Task<IActionResult> EditAuthor(Guid id, Author author){
            author.Id = id;
            return Ok(await Mediator.Send(new Edit.Command{Author = author}));
        }

        [HttpDelete("{id}")]

        public async Task<IActionResult> DeleteAuthor(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id = id}));
        }
   }
}