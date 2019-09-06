using AutoMapper;
using System;
using System.Collections.Generic;
using TripMe.Contracts.Dtos;
using TripMe.Model.EntitySets;
using TripMe.Repositories;
using TripMe.Service.Statistics;

namespace TripMe.Service.Getters
{
    public class PageGetter
    {
        private PageRepository _pageRepository;
        private ReviewGetter _reviewGetter;
        private StatisticObserver _statisticObserver;

        public PageGetter()
        {
            _pageRepository = new PageRepository();
            _reviewGetter = new ReviewGetter();
            _statisticObserver = new StatisticObserver();
        }

        public List<MinimizedDiaryPageDto> GetMinimizedDiaryPages(long diaryId)
        {
            List<DiaryPage> diaryPages = _pageRepository.GetDiaryPages(diaryId);

            _statisticObserver.OnDiaryViewd(diaryId);
            return Mapper.Map<List<MinimizedDiaryPageDto>>(diaryPages);
        }

        public DiaryPageDto GetPageById(long diaryId, long pageId)
        {
            DiaryPage page = _pageRepository.GetPageById(diaryId, pageId);

            if(page == null)
            {
                return null;
            }

            DiaryPageDto diaryPageDto = Mapper.Map<DiaryPageDto>(page);
            Dictionary<Guid, ReviewQuestionnaireAnswerDto> pageReviews = _reviewGetter.GetPageReviews(pageId);

            diaryPageDto.Reviews = pageReviews;
            return diaryPageDto;
        }
    }
}
