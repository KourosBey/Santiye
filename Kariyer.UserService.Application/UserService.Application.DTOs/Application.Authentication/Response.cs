using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kariyer.UserService.Application.UserService.Application.DTOs.Application.Authentication
{
    public class Response<T>
    {
        public T Data { get; set; }
        public List<string> Errors { get; set; } = new List<string>();
        public bool IsSuccess => !Errors.Any();
        
    }


    public class Response
    {
        public List<string> Errors { get; set; } = new List<string>();
        public bool IsSuccess => !Errors.Any();
    }
}
