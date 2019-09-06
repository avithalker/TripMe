using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Cors;
using TripMe.Contracts.Dtos;
using TripMe.Model;
using TripMe.Service.Getters;

namespace TripMeServer.Controllers
{
    [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
    [RoutePrefix("Review")]
    public class ReviewController : ApiController
    {
        [HttpGet]
        [Route("ReviewTypes")]
        public List<ReviewTypeDto> ReviewTypes()
        {
            ReviewGetter reviewGetter = new ReviewGetter();

            return reviewGetter.GetReviewTypes();
        }

        [HttpGet]
        [Route("ReviewQuestionnaire")]
        public List<ReviewQuestionnaireDto> ReviewQuestionnaire()
        {
            ReviewGetter reviewGetter = new ReviewGetter();

            return reviewGetter.GetReviewsQuestionnaires();
        }

        [HttpGet]
        [Route("ReviewQuestionnaireById")]
        public ReviewQuestionnaireDto ReviewQuestionnaireById(int reviewTypeID)
        {
            ReviewGetter reviewGetter = new ReviewGetter();

            return reviewGetter.ReviewQuestionnaireById(reviewTypeID);
        }
    }
}
