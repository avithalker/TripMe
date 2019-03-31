using System.Web.Http;
using System.Web.Http.Cors;
using TripMe.Contracts.Requestes;
using TripMe.Model;
using TripMe.Repositories;
using TripMe.Service;

namespace TripMeServer.Controllers
{
    [EnableCors(origins: "http://localhost:3000", headers:"*",methods:"*")]
    public class DiaryController : ApiController
    {
        [HttpPost]
        [Route("AddNewDiary")]
        public long AddNewDiary(AddNewDiaryRequest addNewDiaryRequest)
        {
            DiaryEditor diaryEditor = new DiaryEditor();

            return diaryEditor.CreateNewDiary(addNewDiaryRequest);
        }

        [HttpGet]
        [Route("DiaryById")]
        public AddNewDiaryRequest DiaryById(long id)
        {
            return new AddNewDiaryRequest {
            Description="testsadadasd"};
        }
    }
}
