using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TripMe.Model;

namespace TripMeServer.Controllers
{
    public class DiaryController : ApiController
    {
        [HttpGet]
        [Route("testMe")]
        public void TestMe()
        {
            using (var dbContext = new TripMeContext())
            {
               // var result = dbContext.Diaries.FirstOrDefault(d => d.Id == 1);
            }
        }
    }
}
