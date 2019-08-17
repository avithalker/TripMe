using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TripMe.Enums
{
    public enum RegistrationStatus
    {
        SUCCESS =1,
        INVALID_PASSWORD,
        INVALID_USERNAME,
        TAKEN_USERNAME
    }
}
