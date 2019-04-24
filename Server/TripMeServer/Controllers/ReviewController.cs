using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using TripMe.Contracts.Dtos;
using TripMe.Service;

namespace TripMeServer.Controllers
{
    [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
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
