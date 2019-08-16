using AutoMapper;
using System.Collections.Generic;
using System.Linq;
using TripMe.Contracts.Dtos;
using TripMe.Contracts.Requestes;
using TripMe.Model.EntitySets;
using TripMe.Repositories;
using TripMe.SearchEngine;
using TripMe.SearchEngine.SearchObjects;

namespace TripMe.Service.Getters
{
    public class DiaryGetter
    {
        private readonly DiaryRepository _diaryRepository;
        private readonly DiarySearcher _diarySearcher;

        public DiaryGetter()
        {
            _diaryRepository = new DiaryRepository();
            _diarySearcher = new DiarySearcher();
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

        public List<DiaryDto> SearchDiary(SearchDiaryRequest searchDiaryRequest)
        {
            List<DiarySearchResult> matchedDiaries = _diarySearcher.SearchDiaries(searchDiaryRequest);
            List<DiaryDto> diaryDtos = matchedDiaries.Select(matchDiary =>
              {
                  DiaryDto diaryDto = Mapper.Map<DiaryDto>(matchDiary.Diary);

                  SetDiaryDtoLocations(diaryDto, matchDiary.Countries.ToList(), matchDiary.Cities.ToList());
                  return diaryDto;
              }).ToList();

            return diaryDtos;
        }

        private void SetDiaryDtoLocations(long diaryId, DiaryDto diaryDto)
        {
            List<DiaryCountry> diaryCountries = _diaryRepository.GetDiaryCountries(diaryId);
            List<DiaryCity> diaryCities = _diaryRepository.GetDiaryCities(diaryId);

            SetDiaryDtoLocations(diaryDto, diaryCountries, diaryCities);
        }

        private void SetDiaryDtoLocations(DiaryDto diaryDto, List<DiaryCountry> diaryCountries, List<DiaryCity> diaryCities)
        {
            diaryDto.Countries = diaryCountries.Select(diaryCountry => diaryCountry.Country).ToList();
            diaryDto.Cities = diaryCities.Select(diaryCity => diaryCity.City).ToList();
        }
    }
}
