using AutoMapper;
using BookSale.Management.Application.Abstracts;
using BookSale.Management.Application.DTOs;
using BookSale.Management.Application.DTOs.Genre;
using BookSale.Management.DataAccess.Abstract;
using BookSale.Management.Domain.Entities;

namespace BookSale.Management.Application.Services
{
    public class UserAddressService : IUserAddressService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public UserAddressService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<IEnumerable<UserAddressDto>> GetUserAddressListForSite(string userId)
        {
            var address = await _unitOfWork.UserAddressRepository.GetAllAddressByUser(userId);

            var result = _mapper.Map<IEnumerable<UserAddressDto>>(address);

            return result;
        }

        public async Task<int> SaveAsync(UserAddressDto userAddressDTO)
        {
            try
            {
                var address = _mapper.Map<UserAddress>(userAddressDTO);

                await _unitOfWork.UserAddressRepository.Save(address);

                await _unitOfWork.CommitAsync();

                return address.Id;
            }
            catch (Exception)
            {
                return -1;
            }
        }
    }
}
