using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace API.Controllers{
[ApiController]
[Route("api/[controller]")]
public class BaseApiController : ControllerBase
{
//making meadiator available to any derived clases from BaseApiController

private IMediator _mediator;
protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();
}


}