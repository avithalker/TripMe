using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TripMe.SearchEngine.SearchFilters
{
    public abstract class SearchFilter<T>
    {
        protected virtual T ParseFilterData(object filterData)
        {
            JObject filterDataAsJobject = filterData as JObject;
            
            return filterDataAsJobject.ToObject<T>();
        }

        public virtual void AddFilterToSearchQuery(object filterData)
        {

        }

        public abstract void AddFilterToSearchQuery(T filterData);
    }
}
