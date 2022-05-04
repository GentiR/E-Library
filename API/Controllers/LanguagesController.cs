using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Languages;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    [AllowAnonymous]
    public class LanguagesController : BaseApiController
    {

        [HttpGet]
         public async Task<ActionResult<List<Language>>> GetLanguages()
         {
             return await Mediator.Send(new List.Query());
         }


        [HttpGet("{id}")]
        public async Task<ActionResult<Language>> GetLanguage(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id=id});
        }


        [HttpPost]
        public async Task<IActionResult> CreateLanguage(Language language)
        {
            return Ok(await Mediator.Send(new Create.Command{Language = language}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditLanguage(Guid id, Language language)
        {
            language.Id = id;
            return Ok(await Mediator.Send(new Edit.Command{Language = language}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLanguage(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id = id}));
        }

    }
}