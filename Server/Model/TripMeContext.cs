using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TripMe.Model
{
    public class TripMeContext : DbContext
    {
        public TripMeContext() : base(nameof(TripMeContext))
        {
            Database.SetInitializer<TripMeContext>(null);
        }

        //public DbSet<Diary> Diaries { get; set; }
    }
}
