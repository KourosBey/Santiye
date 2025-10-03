// Persistence ve Application referansları

using Kariyer.UserService.Application.Interfaces;
using Kariyer.UserService.Application.UserService.Application.DTOs.Application.Authentication;
using Kariyer.UserService.Application.UserService.Application.DTOs.Application.Users;
using Kariyer.UserService.Application.UserService.Application.Services.UserService.Application.Interfaces;
using Kariyer.UserService.Domain.Entity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

public class TokenService : ITokenService
{
    private readonly IConfiguration _configuration;
    private readonly IRefreshTokenRepository _refreshTokenRepository; // Persistence katmanı bağımlılığı

    public TokenService(IConfiguration configuration, IRefreshTokenRepository refreshTokenRepository)
    {
        _configuration = configuration;
        _refreshTokenRepository = refreshTokenRepository;
    }

    // YARDIMCI METOT 1: Access Token Üretimi (Private)
    private string GenerateAccessToken(UserDTO user)
    {
        var claims = new List<Claim>
    {
        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
        new Claim(ClaimTypes.Email, user.Email),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
    };

        // Tek rolü ekle
        if (user.Roles != null && user.Roles.Any())
        {
            claims.Add(new Claim(ClaimTypes.Role, user.Roles.First()));
        }

        // 2. JWT Ayarlarını Oku ve Secret Key'i hazırla
        var jwtSettings = _configuration.GetSection("JwtSettings");
        var key = Encoding.ASCII.GetBytes(jwtSettings["Secret"]); // Secret Key'i byte dizisine çevir

        // 3. İmzayı Oluştur (SigningCredentials)
        // Simetrik anahtar (SymmetricSecurityKey) ve HMAC SHA256 algoritmasını kullan.
        var signingCredentials = new SigningCredentials(
            new SymmetricSecurityKey(key),
            SecurityAlgorithms.HmacSha256Signature // İmzalama Algoritması
        );

        // 4. Token Tanımını Oluştur (Metadata)
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims), // Claims
                                                  // Token'ın geçerlilik süresi
            Expires = DateTime.UtcNow.AddMinutes(Convert.ToDouble(jwtSettings["ExpirationMinutes"])),
            SigningCredentials = signingCredentials, // İmza Bilgisi
            Issuer = jwtSettings["Issuer"],       // Token'ı veren
            Audience = jwtSettings["Audience"]    // Token'ı alacak olan
        };

        // 5. Token'ı Oluştur ve İmzala
        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor); // İmzalama bu aşamada gerçekleşir.

        // 6. String formatında geri döndür
        return tokenHandler.WriteToken(token);
    }

    // YARDIMCI METOT 2: Kriptografik Refresh Token string'i üretir (Private)
    private string GenerateRefreshTokenString()
    {
        var randomNumber = new byte[32];
        using (var rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(randomNumber);
            // Byte dizisini Base64 string'e çevirerek ASCII karakterler elde ederiz.
            return Convert.ToBase64String(randomNumber);
        }
    }

    // =========================================================================================
    // 1. KONTROL METODU: Access + Refresh Token Üretimi ve Kaydı
    // =========================================================================================
    public async Task<AuthResultDTO> GenerateAuthTokensAsync(UserDTO user)
    {
        // 1. Access Token'ı üret
        var accessToken = GenerateAccessToken(user);

        // 2. Refresh Token string'ini üret
        var refreshTokenString = GenerateRefreshTokenString();

        // 3. RefreshToken Entity'sini oluştur (Expires, ApplicationUserId ile)
        var refreshTokenEntity = new RefreshToken { ApplicationUserId = user.Id, Created = DateTime.Now, Expires = DateTime.MaxValue, Id = Guid.NewGuid(), Token = accessToken, RemoteIpAddress = "", IsRevoked = true, Revoked = DateTime.Now };

        // 4. Persistence Repository'i kullanarak DB'ye kaydet
        await _refreshTokenRepository.AddAsync(refreshTokenEntity);

        // 5. AuthResultDto'yu dön
        return new AuthResultDTO { Token = accessToken, RefreshToken = refreshTokenString, UserName = user.UserName };
    }

    // =========================================================================================
    // 2. KONTROL METODU: Token Yenileme
    // =========================================================================================
    public async Task<Response<AuthResultDTO>> RefreshTokenAsync(string oldRefreshToken)
    {
        // 1. Persistence'dan eski token'ı bul (IRefreshTokenRepository.GetByTokenAsync)
        //var existingToken = await _refreshTokenRepository.GetByTokenAsync(oldRefreshToken);

        //if (existingToken == null || !existingToken.IsActive)
        //{
        //    List<string> errors = new List<string>();
        //    errors.Add("Geçersiz veya iptal edilmiş refresh token.");
        //    return new Response<AuthResultDTO> { Data = null, Errors = errors };
        //}

        //// 2. Eski Token'ı İptal Et (Revoke) ve DB'ye kaydet
        //existingToken.IsRevoked = true;
        //await _refreshTokenRepository.UpdateAsync(existingToken);

        // 3. Kullanıcı verisini (UserDto) Identity'den veya Repository'den çek
        var userDto = new UserDTO { /* ... doldur ... */ };

        // 4. Yeni Token Çiftini Üret ve Kaydet
        var newTokens = await GenerateAuthTokensAsync(userDto);

        // 5. Başarılı Cevabı Dön
        return new Response<AuthResultDTO> { Data = newTokens };
    }
}