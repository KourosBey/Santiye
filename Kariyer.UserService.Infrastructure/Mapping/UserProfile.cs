using AutoMapper;
using Kariyer.UserService.Application.UserService.Application.DTOs.Application.Users;
using Kariyer.UserService.Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kariyer.UserService.Infrastructure.Mapping
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            // Kural: ApplicationUser'dan UserDto'ya eşleme yap
            CreateMap<ApplicationUser, UserDTO>()
                // Identity'deki Id (string) alanını UserDto'daki Id (Guid) alanına eşleştir
                .ForMember(
                    dest => dest.Id, // UserDto hedef alan
                    opt => opt.MapFrom(src => src.Id)) // ApplicationUser kaynak alan

                // Email alanlarını doğrudan eşleştir (isimleri aynı olduğu için basit)
                .ForMember(
                    dest => dest.Email,
                    opt => opt.MapFrom(src => src.Email))

                // UserName alanlarını doğrudan eşleştir
                .ForMember(
                    dest => dest.UserName,
                    opt => opt.MapFrom(src => src.UserName))

                // Roller (Roles): ApplicationUser'da bu alan olmadığından (UserManager ile çekilir),
                // AutoMapper'ın bu alanı şimdilik atlamasını söylüyoruz. 
                // Bu alanı _userManager.GetRolesAsync() ile çekip manuel olarak dolduracağız.
                .ForMember(
                    dest => dest.Roles,
                    opt => opt.Ignore())

                // ReverseMap: Ters çevirimi (UserDto -> ApplicationUser) de otomatik olarak tanımla.
                .ReverseMap();
        }
    }
}
