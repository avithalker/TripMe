using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TripMe.Enums;

namespace TripMe.SearchEngine.SearchFilters
{
    public static class FilterFactory
    {
        public static ISearchFilter GetFilter(SearchParameter searchParameter)
        {
            switch(searchParameter)
            {
                case SearchParameter.BY_CITY:
                    return new CityFilter();
                case SearchParameter.BY_CONTINENT:
                    return new ContinentFilter();
                case SearchParameter.BY_COUNTRY:
                    return new CountryFilter();
                case SearchParameter.BY_DURATION_DAYS:
                    return new DurationDaysFilter();
                case SearchParameter.BY_MONTH:
                    return new MonthFilter();
                case SearchParameter.BY_PRICE:
                    return new PriceFilter();
                case SearchParameter.BY_TRAVELERS_COUNT:
                    return new TravelersCountFilter();
                case SearchParameter.BY_TRIP_TYPE:
                    return new TripTypeFilter();
                default: return null;
            }
        }
    }
}
