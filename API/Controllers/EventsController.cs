using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.Events;

namespace API.Controllers
{
    public class EventsController : BaseApiController
    {
        [HttpGet]

        public async Task<ActionResult<List<Event>>> GetEvents(){
            return await Mediator.Send(new List.Query{});
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Event>> GetEvent(Guid id){
          return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]

        public async Task<IActionResult> CreateEvent(Event eventt)
        {
            return Ok(await Mediator.Send(new Create.Command{Event = eventt}));
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> EditEvent(Guid id, Event eventt){
            eventt.Id = id;
            return Ok(await Mediator.Send(new Edit.Command{Event = eventt}));
        }

        [HttpDelete("{id}")]

        public async Task<IActionResult> DeleteEvent(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id = id}));
        }
   }
}

           