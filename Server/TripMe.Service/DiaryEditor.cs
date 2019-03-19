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
            return 1;
        }
    }
}
