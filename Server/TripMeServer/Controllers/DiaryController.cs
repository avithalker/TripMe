﻿using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using TripMe.Contracts.Dtos;
using TripMe.Contracts.Requestes;
using TripMe.Enums;
using TripMe.Model;
using TripMe.Repositories;
using TripMe.SearchEngine.SearchFilters;
using TripMe.Service;
using TripMe.Service.Getters;
using TripMe.Service.Authentication.Jwt;
using TripMe.Service.Authentication;

namespace TripMeServer.Controllers
{
    [EnableCors(origins: "http://localhost:3000", headers:"*",methods:"*")]
    [RoutePrefix("Diary")]
    public class DiaryController : ApiController
    {
        [HttpPost]
        [Authorize]
        [Route("AddNewDiary")]
        public long AddNewDiary(AddNewDiaryRequest addNewDiaryRequest)
        {
            DiaryEditor diaryEditor = new DiaryEditor();

            return diaryEditor.CreateNewDiary(addNewDiaryRequest, HttpContext.Current.GetAuthenticatedUserId());
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
        [Authorize]
        [Route("AddNewPage")]
        public IHttpActionResult AddNewPage(AddNewPageRequest addNewPageRequest)
        {
            UserPermissionManager userPermissionManager = new UserPermissionManager();

            if (!userPermissionManager.IsAllowedToAddPage(addNewPageRequest.DiaryId, HttpContext.Current.GetAuthenticatedUserId()))
            {
                return Unauthorized();
            }

            DiaryEditor diaryEditor = new DiaryEditor();

            return Ok(diaryEditor.CreateNewDiaryPage(addNewPageRequest));
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

        [HttpPost]
        [Route("Search")]
        public IHttpActionResult SearchDiary(SearchDiaryRequest searchDiaryRequest)
        {
            DiaryGetter diaryGetter = new DiaryGetter();
            List<DiaryDto> matchedDiaries = diaryGetter.SearchDiary(searchDiaryRequest);

            if(matchedDiaries== null || matchedDiaries.Count == 0)
            {
                return NotFound();
            }

            return Ok(matchedDiaries);
        }
}
}
