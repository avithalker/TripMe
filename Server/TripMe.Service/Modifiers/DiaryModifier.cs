using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TripMe.Model;
using TripMe.Model.EntitySets;

namespace TripMe.Service.Modifiers
{
    public class DiaryModifier
    {
        public void CreateNewDiary(Diary diary)
        {
            using (var dbContext = new TripMeContext())
            {
                dbContext.Diaries.Add(diary);
                dbContext.SaveChanges();
            }
        }

        public void AddDiaryLocation(List<DiaryLocation> diaryLocations)
        {
            using (var dbContext = new TripMeContext())
            {
                dbContext.DiaryLocations.AddRange(diaryLocations);
                dbContext.SaveChanges();
            }
        }
    }
}
