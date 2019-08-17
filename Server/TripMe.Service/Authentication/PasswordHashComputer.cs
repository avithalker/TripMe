using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TripMe.Service.Authentication
{
    public static class PasswordHashComputer
    {
        public static HashedPasswordData CreateHashedPassword(string password)
        {
            HashedPasswordData hashedPasswordData = new HashedPasswordData();

            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                hashedPasswordData.PasswordSalt = hmac.Key;
                hashedPasswordData.HashedPassword = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }

            return hashedPasswordData;
        }
    }
}
