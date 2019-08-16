using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TripMe.Model;
using TripMe.Model.EntitySets;

namespace TripMe.Repositories
{
    public class PageRepository
    {
        public PageRepository()
        {

        }

        public DiaryPage GetPageById(long diaryId, long pageId)
        {
            using(var dbContext = new TripMeContext())
            {
                return dbContext.DiaryPages.FirstOrDefault(x => x.DiaryId == diaryId && x.PageId == pageId);
            }
        }

        public List<DiaryPage> GetDiaryPages(long diaryId)
        {
            using (var dbContext = new TripMeContext())
            {
                return dbContext.DiaryPages.Where(x => x.DiaryId == diaryId)
                    .OrderBy(page=>page.DisplayOrder).ToList();
            }
        }
    }
}
