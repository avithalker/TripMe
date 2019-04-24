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
    public class ReviewGetter
    {
        private readonly ReviewRepository _reviewRepository;

        public ReviewGetter()
        {
            _reviewRepository = new ReviewRepository();
        }

        public List<ReviewTypeDto> GetReviewTypes()
        {
            List<ReviewType> reviewTypes = _reviewRepository.GetReviewTypes();

            return Mapper.Map<List<ReviewTypeDto>>(reviewTypes);
        }

        public List<ReviewQuestionnaireDto> GetReviewsQuestionnaires()
        {
            List<ReviewField> reviewFields = _reviewRepository.GetReviewFields();

            List<ReviewQuestionnaireDto> reviewQuestionnaireDtos = reviewFields.GroupBy(x => x.ReviewTypeId).Select(reviewFieldsGroup =>
            {
                ReviewQuestionnaireDto questionnaireDto = new ReviewQuestionnaireDto();

                questionnaireDto.ReviewTypeId = reviewFieldsGroup.Key;
                questionnaireDto.Fields = Mapper.Map<List<ReviewFieldDto>>(reviewFieldsGroup.ToList());
                return questionnaireDto;
            }).ToList();

            return reviewQuestionnaireDtos;
        }

        public ReviewQuestionnaireDto ReviewQuestionnaireById(int reviewTypeId)
        {
            List<ReviewField> reviewFields = _reviewRepository.GetReviewFieldsByReviewTypeId(reviewTypeId);
            if(reviewFields.Count == 0)
            {
                return null;
            }

            return new ReviewQuestionnaireDto
            {
                ReviewTypeId = reviewTypeId,
                Fields = Mapper.Map<List<ReviewFieldDto>>(reviewFields)
            };

        }
    }
}
