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

        public static bool IsPasswordEquals(string password, byte[] storedHash, byte[] storedSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i]) return false;
                }
            }

            return true;
        }
    }
}
