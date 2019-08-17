using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TripMe.Contracts.Dtos;
using TripMe.Contracts.Requestes;
using TripMe.Model.EntitySets;

namespace TripMeServer.App_Start.MappingConfig.Profiles
{
    public class UserProfile: Profile
    {
        public UserProfile()
        {
            CreateMap<RegistrationRequest, User>();
            CreateMap<User, UserDto>();
        }
    }
}