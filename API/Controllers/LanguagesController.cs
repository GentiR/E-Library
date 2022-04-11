using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Languages;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class LanguagesController : BaseApiController
    {

        private readonly IMediator _mediator;
        public LanguagesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<Language>>> GetLanguages()
        {
            return await _mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public ActionResult<Language> GetLanguage(Guid id)
        {
            return Ok();
        }
    }
}