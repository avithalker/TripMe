
using System;
using System.Linq;
using AutoMapper;
using TripMe.Contracts.Dtos;
using TripMe.Contracts.Requestes;
using TripMe.Enums;
using TripMe.InternalContracts;
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
            CreateMap<User, WriterDto>();
            CreateMap<DiaryMetaData, DiaryDto>().ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Diary.Id))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Diary.Name))
                .ForMember(dest => dest.StartDate, opt => opt.MapFrom(src => src.Diary.StartDate))
                .ForMember(dest => dest.EndDate, opt => opt.MapFrom(src => src.Diary.EndDate))
                .ForMember(dest => dest.ApproximatePrice, opt => opt.MapFrom(src => src.Diary.ApproximatePrice))
                .ForMember(dest => dest.CoverPhotoUrl, opt => opt.MapFrom(src => src.Diary.CoverPhotoUrl))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Diary.Description))
                .ForMember(dest => dest.TravelersCount, opt => opt.MapFrom(src => src.Diary.TravelersCount))
                .ForMember(dest => dest.TripType, opt => opt.MapFrom(src => src.Diary.TripType));
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