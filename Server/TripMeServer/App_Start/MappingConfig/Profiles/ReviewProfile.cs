using AutoMapper;
using TripMe.Contracts.Dtos;
using TripMe.Model.EntitySets;

namespace TripMeServer.App_Start.MappingConfig.Profiles
{
    public class ReviewProfile:Profile
    {
        public ReviewProfile()
        {
            CreateMap<ReviewType, ReviewTypeDto>();
            CreateMap<ReviewQuestion, ReviewFieldDto>().ForMember(dest => dest.QuestionId, opt => opt.MapFrom(src => src.Id));
        }
    }
}