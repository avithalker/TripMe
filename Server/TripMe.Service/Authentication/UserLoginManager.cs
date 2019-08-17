using AutoMapper;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TripMe.Contracts.Dtos;
using TripMe.Contracts.Requestes;
using TripMe.Model.EntitySets;
using TripMe.Repositories;
using TripMe.Service.Authentication.Jwt;

namespace TripMe.Service.Authentication
{
    public class UserLoginManager
    {
        private readonly UserRepository _userRepository;

        public UserLoginManager()
        {
            _userRepository = new UserRepository();
        }

        public AuthenticatedUserDto TryLogin(LoginRequest loginRequest)
        {
            User user;

            if (!IsUserAuthenticated(loginRequest,out user))
            {
                return null;
            }

            AuthenticatedUserDto authenticatedUserDto = Mapper.Map<AuthenticatedUserDto>(user);
            string securityToken = JwtTokenCreator.CreateToken(user, ConfigurationManager.AppSettings["SecretSignatureKey"]);

            authenticatedUserDto.Token = securityToken;
            return authenticatedUserDto;
        }

        private bool IsUserAuthenticated(LoginRequest loginRequest, out User user)
        {
            user = null;
            if (string.IsNullOrWhiteSpace(loginRequest.UserName) || string.IsNullOrWhiteSpace(loginRequest.Password))
            {
                return false;
            }

            user = _userRepository.GetByUserName(loginRequest.UserName);
            if(user == null)
            {
                return false;
            }

            return VerifyUserPassword(loginRequest.Password, user);
        }

        private bool VerifyUserPassword(string loginPassword, User user)
        {
            return PasswordHashComputer.IsPasswordEquals(loginPassword, user.HashedPassword, user.PasswordSalt);
        }
    }
}
