using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TripMe.Model;
using TripMe.Model.EntitySets;

namespace TripMe.Repositories
{
    public class UserRepository
    {
        public User GetByUserName(string userName)
        {
            using(var dbContext = new TripMeContext())
            {
                return dbContext.Users.FirstOrDefault(x => x.UserName == userName);
            }
        }
    }
}
