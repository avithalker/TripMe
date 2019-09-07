using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TripMe.SearchEngine.SearchObjects;

namespace TripMe.SearchEngine.OrderFilter
{
    public interface IPostOrderFilter
    {
        IEnumerable<DiarySearchResult> AddOrder(IEnumerable<DiarySearchResult> CurrentResult);
    }
}
