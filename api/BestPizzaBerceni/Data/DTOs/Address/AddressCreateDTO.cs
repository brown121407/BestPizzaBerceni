namespace BestPizzaBerceni.Data.DTOs.Address
{
    public class AddressCreateDTO
    {
        public int Id { get; set; }
        public string County { get; set; }
        public string City { get; set; }
        public string AddressLine { get; set; }
        public string PostalCode { get; set; }
        public string PhoneNumber { get; set; }
        
        public int User { get; set; }
    }
}