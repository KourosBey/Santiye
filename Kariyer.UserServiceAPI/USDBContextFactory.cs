using Kariyer.UserService.Persistence.Context; // USDBContext'in bulunduğu yer
using Kariyer.UserService.Persistence.Context.USDBContext;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

// Bu sınıf sadece dotnet ef komutları için gereklidir.
public class USDBContextFactory : IDesignTimeDbContextFactory<USDBContext>
{
    public USDBContext CreateDbContext(string[] args)
    {
        // 1. Connection String'i Manuel Oku (Çalışma Zamanı Konfigürasyonu Olmadığı İçin)
        // Normalde Program.cs'ten okunan Connection String'i burada manuel yüklüyoruz.
        var configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json") // API projesindeki appsettings.json dosyasını oku
            .Build();

        var connectionString = configuration.GetConnectionString("DefaulConnection");

        // 2. DbContextOptions'ı Oluştur
        var builder = new DbContextOptionsBuilder<USDBContext>();
        builder.UseSqlServer(connectionString);

        // 3. DbContext'i Oluştur ve Döndür
        return new USDBContext(builder.Options);
    }
}