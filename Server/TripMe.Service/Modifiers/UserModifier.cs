using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TripMe.Model;
using TripMe.Model.EntitySets;

namespace TripMe.Service.Modifiers
{
    public class UserModifier
    {
        public long CreateUser(User user)
        {
            using(var dbcontext = new TripMeContext())
            {
                dbcontext.Users.Add(user);
                dbcontext.SaveChanges();
            }

            return user.Id;
        }
    }
}
