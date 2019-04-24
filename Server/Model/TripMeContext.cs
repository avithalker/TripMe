using System.Data.Entity;
using TripMe.Model.EntitySets;

namespace TripMe.Model
{
    public class TripMeContext : DbContext
    {
        public TripMeContext() : base(nameof(TripMeContext))
        {
            Database.SetInitializer<TripMeContext>(null);
        }

        public DbSet<Diary> Diaries { get; set; }
        public DbSet<DiaryLocation> DiaryLocations { get; set; }
        public DbSet<DiaryCountry> DiaryCountries { get; set; }
        public DbSet<DiaryCity> DiaryCities { get; set; }
        public DbSet<ReviewType> ReviewTypes { get; set; }
        public DbSet<ReviewField> ReviewFields { get; set; }
    }
}
