namespace TripMe.Contracts.Dtos
{
    public class AuthenticatedUserDto: UserDto
    {
        public string Token { get; set; }
    }
}
