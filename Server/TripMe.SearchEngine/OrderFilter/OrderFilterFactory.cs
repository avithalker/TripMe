using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TripMe.Contracts.Requestes;
using TripMe.Enums;

namespace TripMe.SearchEngine.OrderFilter
{
    public static class OrderFilterFactory
    {
        public static IPreOrderFilter GetPreOrderFilter(OrderParameter orderParameter, SearchDiaryRequest searchRequest)
        {
            switch (orderParameter)
            {
                case OrderParameter.MOST_RECENT:
                    return new MostRecentFilter();
                case OrderParameter.MOST_VIEWED:
                    if(searchRequest.SearchParameters.Count == 0)
                    {
                        return new PreMostViewedOrderFilter();
                    }
                    return null;
                default:
                    return null;
            }
        }

        public static IPostOrderFilter GetPostOrderFilter(OrderParameter orderParameter, SearchDiaryRequest searchRequest)
        {
            switch (orderParameter)
            {
                case OrderParameter.MOST_VIEWED:
                    if (searchRequest.SearchParameters.Count > 0 )
                    {
                        return new PostMostViewedOrderFilter();
                    }
                    return null;
                default:
                    return null;
            }
        }
    }
}
