using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TripMe.Model.EntitySets;
using TripMe.Repositories;

namespace TripMe.Service.Authentication
{
    public class UserPermissionManager
    {
        private readonly DiaryRepository _diaryRepository;

        public UserPermissionManager()
        {
            _diaryRepository = new DiaryRepository(); 
        }

        public bool IsAllowedToAddPage(long diaryId, long userId)
        {
            Diary diary = _diaryRepository.GetDiary(diaryId);

            if(diary == null || diary.WriterId != userId)
            {
                return false;
            }

            return true;
        }
    }
}
