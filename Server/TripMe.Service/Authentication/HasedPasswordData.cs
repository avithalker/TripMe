namespace TripMe.Service.Authentication
{
    public class HashedPasswordData
    {
        public byte[] HashedPassword { get; set; }
        public byte[] PasswordSalt { get; set; }
    }
}
