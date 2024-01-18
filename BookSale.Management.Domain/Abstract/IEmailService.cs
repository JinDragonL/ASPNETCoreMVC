using BookSale.Management.Domain.Setting;

namespace BookSale.Management.Infrastruture.Services
{
    public interface IEmailService
    {
        Task<bool> Send(EmailSetting emailSetting);
    }
}