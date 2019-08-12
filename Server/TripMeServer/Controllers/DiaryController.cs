using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Cors;
using TripMe.Contracts.Dtos;
using TripMe.Contracts.Requestes;
using TripMe.Enums;
using TripMe.Model;
using TripMe.Repositories;
using TripMe.Service;
using TripMe.Service.Getters;

namespace TripMeServer.Controllers
{
    [EnableCors(origins: "http://localhost:3000", headers:"*",methods:"*")]
    [RoutePrefix("Diary")]
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

        [HttpGet]
        [Route("Page")]
        public DiaryPageDto GetPageById(long diaryId, long pageId)
        {
            PageGetter pageGetter = new PageGetter();

            return pageGetter.GetPageById(diaryId, pageId);
        }

        [HttpGet]
        [Route("DiaryMinimizedPageList")]
        public List<MinimizedDiaryPageDto> GetDiaryMinimizedPageList(long diaryId)
        {
            PageGetter pageGetter = new PageGetter();

            return pageGetter.GetMinimizedDiaryPages(diaryId);
        }

        [HttpGet]
        [Route("test")]
        public int test()
        {
            Dictionary<SearchParameter, object> dic = new Dictionary<SearchParameter, object>();
            dic.Add(SearchParameter.BY_CITY, 2);
            dic.Add(SearchParameter.BY_CONTINENT, new DiaryDto());

            string a=JsonConvert.SerializeObject(dic);

            dic = JsonConvert.DeserializeObject<Dictionary<SearchParameter, object>>(a);
            int number = Convert.ToInt32(dic[SearchParameter.BY_CITY]);
            DiaryDto d = ((JObject)dic[SearchParameter.BY_CONTINENT]).ToObject<DiaryDto>();
            return 1;
        }
    }
}
