using FluentValidation;
using Kariyer.UserService.Application.UserService.Application.DTOs.Application.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kariyer.UserService.Application.Validator
{
    public class RegisterValidator
    {
        public class RegisterUserValidator : AbstractValidator<RegisterDTO>
        {
            public RegisterUserValidator()
            {
                RuleFor(x => x.Username).NotEmpty().WithMessage("Username is required.");
                RuleFor(x => x.Email).NotEmpty().EmailAddress().WithMessage("A valid email is required.");
                RuleFor(x => x.Password).NotEmpty().MinimumLength(6).WithMessage("Password must be at least 6 characters long.");
            }
        }

    }

}
