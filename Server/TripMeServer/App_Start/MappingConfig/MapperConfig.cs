using AutoMapper;
using TripMeServer.App_Start.MappingConfig.Profiles;

namespace TripMeServer.App_Start.MappingConfig
{
    public static class MapperConfig
    {
        public static void Initialize()
        {
            Mapper.Initialize(cfg =>
            {
                cfg.AddProfile(new DiaryProfile());
                cfg.AddProfile(new ReviewProfile());
                cfg.AddProfile(new PageProfile());
            });
        }
    }
}