using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TripMe.InternalContracts;
using TripMe.Model;
using TripMe.Model.EntitySets;

namespace TripMe.Repositories
{
    public class DiaryRepository
    {
        public DiaryMetaData GetDiary(long id)
        {
            using (var dbContext = new TripMeContext())
            {
                return (from diary in dbContext.Diaries
                        join user in dbContext.Users on diary.WriterId equals user.Id into writer
                        where diary.Id == id
                        select new DiaryMetaData { Diary = diary, Writer = writer.FirstOrDefault() }).FirstOrDefault();
            }
        }

        public List<DiaryMetaData> GetDiariesByUser(long userId)
        {
            using (var dbContext = new TripMeContext())
            {
                return (from diary in dbContext.Diaries
                        join user in dbContext.Users on diary.WriterId equals user.Id into writer
                        where diary.WriterId == userId
                        select new DiaryMetaData { Diary = diary, Writer = writer.FirstOrDefault()}).ToList();
               // return dbContext.Diaries.AsQueryable().Where(x=>x.WriterId == userId).OrderByDescending(x => x.Id).ToList();   
            }
        }
        
        public List<DiaryCountry>GetDiaryCountries(long diaryId)
        {
            using (var dbContext = new TripMeContext())
            {
                return dbContext.DiaryCountries.Where(x => x.DiaryId == diaryId).ToList();
            }
        }

        public List<DiaryCity> GetDiaryCities(long diaryId)
        {
            using (var dbContext = new TripMeContext())
            {
                return dbContext.DiaryCities.Where(x => x.DiaryId == diaryId).ToList();
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
