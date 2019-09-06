using System.Configuration;
using StackExchange.Redis;

namespace TripMe.Model
{
    public class TripMeCacheContext
    {
        private static TripMeCacheContext _instance;
        private static object _syncObject = new object();
        private ConnectionMultiplexer _redisConnection;

        private TripMeCacheContext()
        {
            connectRedis();
        }

        public ConnectionMultiplexer redisConnection
        {
            get
            {
                return _redisConnection;
            }
        }

        public static IDatabase Context()
        {
            if(_instance == null)
            {
                lock (_syncObject)
                {
                    if(_instance == null)
                    {
                        _instance = new TripMeCacheContext();
                    }
                }
            }
            return _instance.redisConnection.GetDatabase();
        }

        private void connectRedis()
        {
            _redisConnection = ConnectionMultiplexer.Connect(ConfigurationManager.AppSettings["RedisConnectionString"]);
        }
    }
}
