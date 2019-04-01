using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TripMe.Contracts.Requestes;
using TripMe.Model.EntitySets;
using TripMe.Service.Modifiers;

namespace TripMe.Service
{
    public class DiaryEditor
    {
        private readonly DiaryModifier _diaryModifier;

        public DiaryEditor()
        {
            _diaryModifier = new DiaryModifier();
        }

        public long CreateNewDiary(AddNewDiaryRequest newDiaryRequest)
        {
            Diary diary= Mapper.Map<AddNewDiaryRequest, Diary>(newDiaryRequest);

            _diaryModifier.CreateNewDiary(diary);
            if (newDiaryRequest.Countries != null && newDiaryRequest.Countries.Count > 0)
            {
                _diaryModifier.AddDiaryCountries(newDiaryRequest.Countries.Select(
                    x => new DiaryCountry { DiaryId = diary.Id, Country = x }).ToList());
            }

            if (newDiaryRequest.Cities != null && newDiaryRequest.Cities.Count > 0)
            {
               _diaryModifier.AddDiaryCities(newDiaryRequest.Cities.Select(
                x => new DiaryCity { DiaryId = diary.Id, City = x }).ToList());
            }
            return diary.Id;
        }
    }
}
