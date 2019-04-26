using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TripMe.Model;
using TripMe.Model.EntitySets;
using System.Data.Entity.Migrations;

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

        public void AddDiaryCountries(List<DiaryCountry> countries)
        {
            using (var dbContext = new TripMeContext())
            {
                dbContext.DiaryCountries.AddRange(countries);
                dbContext.SaveChanges();
            }
        }

        public void AddDiaryCities(List<DiaryCity> cities)
        {
            using (var dbContext = new TripMeContext())
            {
                dbContext.DiaryCities.AddRange(cities);
                dbContext.SaveChanges();
            }
        }

        public void CreateNewPage(DiaryPage page)
        {
            using (var dbContext = new TripMeContext())
            {
                dbContext.DiaryPages.Add(page);
                dbContext.SaveChanges();
            }
        }

        public void CreateNewReviews(List<Review> reviews)
        {
            using (var dbContext = new TripMeContext())
            {
                dbContext.Reviews.AddRange(reviews);
                dbContext.SaveChanges();
            }
        }

        public void UpdateReviewAnswers(List<ReviewAnswer> answers)
        {
            using (var dbContext = new TripMeContext())
            {
                dbContext.ReviewAnswers.AddOrUpdate(answers.ToArray());
                dbContext.SaveChanges();
            }
        }
    }
}
