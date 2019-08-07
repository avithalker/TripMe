using AutoMapper;
using TripMe.Contracts.Dtos;
using TripMe.Contracts.Requestes;
using TripMe.Model.EntitySets;

namespace TripMeServer.App_Start.MappingConfig.Profiles
{
    public class PageProfile: Profile
    {
        public PageProfile()
        {
            CreateMap<AddNewPageRequest, DiaryPage>();

            CreateMap<DiaryPage, DiaryPageDto>()
                .ForMember(dest => dest.PageNumber, opt => opt.MapFrom(src => src.DisplayOrder));

            CreateMap<DiaryPage,MinimizedDiaryPageDto>()
                                .ForMember(dest => dest.PageNumber, opt => opt.MapFrom(src => src.DisplayOrder));
        }
    }
}