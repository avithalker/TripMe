using System.Web.Http;
using TripMe.Contracts.Requestes;
using TripMe.Model;

namespace TripMeServer.Controllers
{
    public class DiaryController : ApiController
    {
        [HttpPost]
        [Route("AddNewDiary")]
        public void AddNewDiary(AddNewDiaryRequest addNewDiaryRequest)
        {
            using (var dbContext = new TripMeContext())
            {
               // var result = dbContext.Diaries.FirstOrDefault(d => d.Id == 1);
            }
        }
    }
}
