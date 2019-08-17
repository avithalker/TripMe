using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TripMe.Contracts.Dtos;
using TripMe.Contracts.Requestes;
using TripMe.Enums;
using TripMe.Model.EntitySets;
using TripMe.Repositories;
using TripMe.Service.Modifiers;

namespace TripMe.Service.Authentication
{
    public class UserRegistrator
    {
        private readonly UserRepository _userRepository;
        private readonly UserModifier _userModifier;
        public UserRegistrator()
        {
            _userRepository = new UserRepository();
            _userModifier = new UserModifier();
        }

        public UserDto RegisterNewUser(RegistrationRequest registrationRequest, out RegistrationStatus registrationStatus)
        {
            registrationStatus = ValidateRegistration(registrationRequest);

            if(registrationStatus != RegistrationStatus.SUCCESS)
            {
                return null;
            }

            HashedPasswordData hashedPassword = PasswordHashComputer.CreateHashedPassword(registrationRequest.Password);
            User user = CreateUser(registrationRequest, hashedPassword);

            return Mapper.Map<UserDto>(user);
        }

        private User CreateUser(RegistrationRequest registrationRequest, HashedPasswordData hashedPassword)
        {
            User user = Mapper.Map<User>(registrationRequest);

            user.HashedPassword = hashedPassword.HashedPassword;
            user.PasswordSalt = hashedPassword.PasswordSalt;

            _userModifier.CreateUser(user);
            return user;
        }

        private RegistrationStatus ValidateRegistration(RegistrationRequest registrationRequest)
        {
            if (string.IsNullOrWhiteSpace(registrationRequest.Password))
            {
                return RegistrationStatus.INVALID_PASSWORD;
            }

            if(string.IsNullOrWhiteSpace(registrationRequest.UserName))
            {
                return RegistrationStatus.INVALID_USERNAME;
            }

            if(_userRepository.GetByUserName(registrationRequest.UserName) != null)
            {
                return RegistrationStatus.TAKEN_USERNAME;
            }

            return RegistrationStatus.SUCCESS;
        }
    }
}
