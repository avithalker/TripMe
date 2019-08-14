using AutoMapper;
using System.Collections.Generic;
using System.Linq;
using TripMe.Contracts.Dtos;
using TripMe.Model.EntitySets;
using TripMe.Repositories;

namespace TripMe.Service.Getters
{
    public class DiaryGetter
    {
        private readonly DiaryRepository _diaryRepository;

        public DiaryGetter()
        {
            _diaryRepository = new DiaryRepository();
        }

        public List<DiaryDto> GetDiariesByUser()
        {
            List<Diary> diaries = _diaryRepository.GetDiariesByUser();
            List<DiaryDto> diariesDtos = Mapper.Map<List<DiaryDto>>(diaries);

            foreach (DiaryDto diaryDto in diariesDtos)
            {
                SetDiaryDtoLocations(diaryDto.Id, diaryDto);
            }

            return diariesDtos;
        }

        public DiaryDto GetDiaryById(long id)
        {
            Diary diary = _diaryRepository.GetDiary(id);

            if(diary==null)
            {
                return null;
            }

            DiaryDto diaryDto = Mapper.Map<DiaryDto>(diary);
            SetDiaryDtoLocations(id, diaryDto);
            return diaryDto;
        }

        private void SetDiaryDtoLocations(long diaryId, DiaryDto diaryDto)
        {
            List<DiaryCountry> diaryCountries = _diaryRepository.GetDiaryCountries(diaryId);
            List<DiaryCity> diaryCities = _diaryRepository.GetDiaryCities(diaryId);

            diaryDto.Countries = diaryCountries.Select(diaryCountry => diaryCountry.Country).ToList();
            diaryDto.Cities = diaryCities.Select(diaryCity => diaryCity.City).ToList();
        }
    }
}
