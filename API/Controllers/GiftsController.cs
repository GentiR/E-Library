using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.Gifts;
using System.Threading;
namespace API.Controllers
{
    public class GiftsController : BaseApiController
    {


        [HttpGet]
         public async Task<ActionResult<List<Gift>>> GetGifts()
         {
             return await Mediator.Send(new List.Query());
         }


        [HttpGet("{id}")]
        public async Task<ActionResult<Gift>> GetGift(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id=id});
        }


        [HttpPost]
        public async Task<IActionResult> CreateGift(Gift gift)
        {
            return Ok(await Mediator.Send(new Create.Command{Gift = gift}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditGift(Guid id, Gift gift)
        {
            gift.Id = id;
            return Ok(await Mediator.Send(new Edit.Command{Gift = gift}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGift(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id = id}));
        }

    }
}