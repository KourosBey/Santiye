using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Kariyer.UserService.Domain.Entity;// Company, Worker, CV, CVExperienceInfos, CVEducationInfos, EducationSchool, WorkerCompetence, References gibi entity tiplerinin tanımlı olduğu namespace'i ekleyin

namespace Kariyer.UserService.Persistence.Context.USDBContext   
{
    public class USDBContext : IdentityDbContext<ApplicationUser, IdentityRole<Guid>, Guid>
    {
        public USDBContext(DbContextOptions<USDBContext> options) : base(options) { }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);


            // Özelleştirilmiş mappingler burada yapılabilir
        }
    }
}
