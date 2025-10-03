using Kariyer.UserService.Application.UserService.Application.DTOs.Application.Authentication;
using Kariyer.UserService.Application.UserService.Application.Services.UserService.Application.Interfaces;
using Kariyer.UserService.Domain.UserService.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;

namespace Kariyer.UserService.API.Controllers
{
    public class AuthController : ControllerBase
    {
        private readonly IAuthenticationService _authService;
        public AuthController(IAuthenticationService authService) // Application'dan kontratı enjekte et
        {
            _authService = authService;
        }
        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginDTO request)
        {

            var result = await _authService.LoginAsync(request);
            if (!result.IsSuccess)
            {
                return Unauthorized(result); // Hata durumunda 401 Unauthorized döner
            }
            return Ok(result); // Başarılı durumda 200 OK döner
        }
        [HttpPost("register/user")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] RegisterDTO request)
        {
            Response result = new Response();

            result = await _authService.RegisterAsync(request);
            if (!result.IsSuccess)
            {
                return Unauthorized(result); // Hata durumunda 401 Unauthorized döner
            }
            return Ok(result); // Başarılı durumda 200 OK döner


        }
        [HttpPost("register/business")]
        [AllowAnonymous]
        public async Task<IActionResult> RegisterBussiness([FromBody] RegisterBussinessDTO request)
        {
            Response result = new Response();
          
                result = await _authService.RegisterBussiness(request);
                if (!result.IsSuccess)
                {
                    return Unauthorized(result); // Hata durumunda 401 Unauthorized döner
                }
                return Ok(result); // Başarılı durumda 200 OK döner
          

        }
        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken([FromBody] string request)
        {
            var result = await _authService.RefreshToken(request);

            if (result.IsSuccess)
            {
                return Ok(result);
            }

            return Unauthorized(result); // Unauthorized (Yetkisiz) dönmek daha uygundur
        }
    }
}
