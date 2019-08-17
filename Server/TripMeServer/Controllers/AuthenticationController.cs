using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using TripMe.Contracts.Dtos;
using TripMe.Contracts.Requestes;
using TripMe.Enums;
using TripMe.Service.Authentication;

namespace TripMeServer.Controllers
{
    [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
    [RoutePrefix("Authentication")]
    public class AuthenticationController : ApiController
    {
        [HttpPost]
        [Route("Register")]
        public IHttpActionResult Register(RegistrationRequest registrationRequest)
        {
            UserRegistrator userRegistrator = new UserRegistrator();
            RegistrationStatus registrationStatus;
            UserDto userDto = userRegistrator.RegisterNewUser(registrationRequest, out registrationStatus);

            if(userDto == null)
            {
                return BadRequest(registrationStatus.ToString());
            }

            return Ok(userDto);
        }

        [HttpPost]
        [Route("Login")]
        public IHttpActionResult Login(LoginRequest loginRequest)
        {
            UserLoginManager userLoginManager = new UserLoginManager();
            AuthenticatedUserDto authenticatedUserDto = userLoginManager.TryLogin(loginRequest);

            if(authenticatedUserDto == null)
            {
                return Unauthorized();
            }

            return Ok(authenticatedUserDto);
        }
    }
}
