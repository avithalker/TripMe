
using AutoMapper;
using TripMe.Contracts.Dtos;
using TripMe.Contracts.Requestes;
using TripMe.Model.EntitySets;

namespace TripMeServer.App_Start.MappingConfig.Profiles
{
    public class DiaryProfile:Profile
    {
        public DiaryProfile()
        {
            CreateMap<AddNewDiaryRequest, Diary>().ForMember(dest => dest.TravelersCount, opt => opt.MapFrom(src => src.NumberOfTravelers))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.DiaryName))
                .ForMember(dest => dest.TripType, opt => opt.MapFrom(src => (short)src.TripType));

            CreateMap<Diary, DiaryDto>();

            CreateMap<AddNewPageRequest, DiaryPage>();
        }
    }
}