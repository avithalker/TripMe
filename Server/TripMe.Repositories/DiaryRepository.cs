using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TripMe.Model;
using TripMe.Model.EntitySets;

namespace TripMe.Repositories
{
    public class DiaryRepository
    {
        public Diary GetDiary(long id)
        {
            using (var dbContext = new TripMeContext())
            {
                return dbContext.Diaries.FirstOrDefault(x => x.Id == id);
            }
        }

        public List<DiaryLocation> GetDiaryLocations(long diaryId)
        {
            using (var dbContext = new TripMeContext())
            {
                return dbContext.DiaryLocations.Where(x => x.DiaryId == diaryId).ToList();
            }
        }
    }
}
