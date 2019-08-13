﻿using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TripMe.SearchEngine.SearchObjects;

namespace TripMe.SearchEngine.SearchFilters
{
    public abstract class SearchFilter<T>
    {
        protected virtual T ParseFilterData(object filterData)
        {
            JObject filterDataAsJobject = filterData as JObject;
            
            return filterDataAsJobject.ToObject<T>();
        }

        public virtual IQueryable<DiarySearchResult> AddFilterToSearchQuery(object filterData, IQueryable<DiarySearchResult> currentQuery)
        {
            T parsedFilterData = ParseFilterData(filterData);

            return AddFilterToSearchQuery(parsedFilterData, currentQuery);
        }

        public abstract IQueryable<DiarySearchResult> AddFilterToSearchQuery(T filterData, IQueryable<DiarySearchResult> currentQuery);
    }
}
