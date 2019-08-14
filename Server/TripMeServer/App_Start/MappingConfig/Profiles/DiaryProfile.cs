
using System;
using System.Linq;
using AutoMapper;
using TripMe.Contracts.Dtos;
using TripMe.Contracts.Requestes;
using TripMe.Enums;
using TripMe.Model.EntitySets;

namespace TripMeServer.App_Start.MappingConfig.Profiles
{
    public class DiaryProfile:Profile
    {
        public DiaryProfile()
        {
            CreateMap<AddNewDiaryRequest, Diary>().ForMember(dest => dest.TravelersCount, opt => opt.MapFrom(src => src.NumberOfTravelers))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.DiaryName))
                .ForMember(dest => dest.TripType, opt => opt.MapFrom(src => (short)src.TripType))
                .ForMember(dest => dest.Continent, opt => opt.MapFrom(GetContinent));

            CreateMap<Diary, DiaryDto>();
        }

        private string GetContinent(AddNewDiaryRequest addNewDiaryRequest, Diary diary)
        {
            string countryCode = addNewDiaryRequest.Countries.FirstOrDefault();
            
            if(countryCode == null)
            {
                return null;
            }

            return GeoData.GetContinentByCountry(countryCode);
        }
    }
}