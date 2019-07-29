using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Cors;
using TripMe.Contracts.Dtos;
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
        public DiaryDto DiaryById(long id)
        {
            DiaryGetter diaryGetter = new DiaryGetter();

            return diaryGetter.GetDiaryById(id);
        }

        [HttpGet]
        [Route("DiariesByUser")]
        public List<DiaryDto> DiariesByUser()
        {
            DiaryGetter diaryGetter = new DiaryGetter();

            return diaryGetter.GetDiariesByUser();
        }

        [HttpPost]
        [Route("AddNewPage")]
        public long AddNewPage(AddNewPageRequest addNewPageRequest)
        {
            DiaryEditor diaryEditor = new DiaryEditor();

            return diaryEditor.CreateNewDiaryPage(addNewPageRequest);
        }
    }
}
