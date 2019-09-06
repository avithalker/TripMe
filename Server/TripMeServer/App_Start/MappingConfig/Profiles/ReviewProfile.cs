using AutoMapper;
using TripMe.Contracts.Dtos;
using TripMe.Enums;
using TripMe.Model.EntitySets;

namespace TripMeServer.App_Start.MappingConfig.Profiles
{
    public class ReviewProfile:Profile
    {
        public ReviewProfile()
        {
            CreateMap<ReviewType, ReviewTypeDto>().ForMember(dest => dest.StructureTypeId, opt => opt.MapFrom(src => (ReviewStructureType)src.StructureTypeId));
            CreateMap<ReviewQuestion, ReviewFieldDto>().ForMember(dest => dest.QuestionId, opt => opt.MapFrom(src => src.Id));
            CreateMap<Review, ReviewQuestionnaireAnswerDto>().ForMember(dest => dest.ReviewType, opt => opt.MapFrom(src => src.ReviewTypeId));
            CreateMap<ReviewQuestionnaireAnswerDto, Review>().ForMember(dest => dest.ReviewTypeId, opt => opt.MapFrom(src => src.ReviewType));

        }
    }
}