using System.Web.Http;
using TripMe.Contracts.Requestes;
using TripMe.Model;
using TripMe.Repositories;
using TripMe.Service;

namespace TripMeServer.Controllers
{
    public class DiaryController : ApiController
    {
        [HttpPost]
        [Route("AddNewDiary")]
        public void AddNewDiary(AddNewDiaryRequest addNewDiaryRequest)
        {
            DiaryEditor diaryEditor = new DiaryEditor();

            diaryEditor.CreateNewDiary(addNewDiaryRequest);
        }
    }
}
