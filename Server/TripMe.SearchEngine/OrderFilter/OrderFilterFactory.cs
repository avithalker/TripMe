using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TripMe.Enums;

namespace TripMe.SearchEngine.OrderFilter
{
    public static class OrderFilterFactory
    {
        public static IOrderFilter GetFilter(OrderParameter orderParameter)
        {
            switch (orderParameter)
            {
                case OrderParameter.MOST_RECENT:
                    return new MostRecentFilter();
                default:
                    return null;
            }
        }
    }
}
