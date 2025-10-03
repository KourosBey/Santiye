using Kariyer.UserService.Application.UserService.Application.DTOs.Application.Authentication;
using Kariyer.UserService.Application.UserService.Application.DTOs.Application.Users;
using Kariyer.UserService.Domain.UserService.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kariyer.UserService.Application.UserService.Application.Services.UserService.Application.Interfaces
{
    public interface ITokenService
    {
        // 1. Kullanıcı verisini alır, Access Token üretir ve Refresh Token'ı DB'ye kaydeder.
        // (Login/Register başarılı olduğunda IdentityService tarafından çağrılır.)
        public Task<AuthResultDTO> GenerateAuthTokensAsync(UserDTO user);

        // 2. Refresh Token'ı alır, geçerliliğini kontrol eder, eskiyi iptal eder ve yeni çifti üretir.
        // (API Controller'dan veya AuthenticationService'ten çağrılır.)
        public Task<Response<AuthResultDTO>> RefreshTokenAsync(string oldRefreshToken);

        // Not: Artık sadece Access Token üreten metodu (GenerateJwtTokenAsync) private yaptık, 
        // dış dünya sadece tüm sonucu (Access + Refresh) dönen AuthResultDto'yu görmeli.
    }
}
