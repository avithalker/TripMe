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
    public class DiaryGetter
    {
        private readonly DiaryRepository _diaryRepository;

        public DiaryGetter()
        {
            _diaryRepository = new DiaryRepository();
        }

        public DiaryDto GetDiaryById(long id)
        {
            Diary diary = _diaryRepository.GetDiary(id);

            if(diary==null)
            {
                return null;
            }

            DiaryDto diaryDto = Mapper.Map<DiaryDto>(diary);
            SetDiaryDtoLocations(id, ref diaryDto);
            return diaryDto;
        }

        private void SetDiaryDtoLocations(long diaryId, ref DiaryDto diaryDto)
        {
            List<DiaryCountry> diaryCountries = _diaryRepository.GetDiaryCountries(diaryId);
            List<DiaryCity> diaryCities = _diaryRepository.GetDiaryCities(diaryId);

            diaryDto.Countries = diaryCountries.Select(diaryCountry => diaryCountry.Country).ToList();
            diaryDto.Cities = diaryCities.Select(diaryCity => diaryCity.City).ToList();
        }
    }
}
