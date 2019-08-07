using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TripMe.Contracts.Dtos;
using TripMe.Model.EntitySets;
using TripMe.Repositories;

namespace TripMe.Service
{
    public class PageGetter
    {
        public PageGetter()
        {

        }

        public List<MinimizedDiaryPageDto> GetMinimizedDiaryPages(long diaryId)
        {
            PageRepository pageRepository = new PageRepository();
            List<DiaryPage> diaryPages = pageRepository.GetDiaryPages(diaryId);

            return Mapper.Map<List<MinimizedDiaryPageDto>>(diaryPages);
        }

        public DiaryPageDto GetPageById(long diaryId, long pageId)
        {
            PageRepository pageRepository = new PageRepository();
            ReviewGetter reviewGetter = new ReviewGetter();
            DiaryPage page = pageRepository.GetPageById(diaryId, pageId);

            if(page == null)
            {
                return null;
            }

            DiaryPageDto diaryPageDto = Mapper.Map<DiaryPageDto>(page);
            Dictionary<Guid, ReviewQuestionnaireAnswerDto> pageReviews = reviewGetter.GetPageReviews(pageId);

            diaryPageDto.Reviews = pageReviews;
            return diaryPageDto;
        }
    }
}
