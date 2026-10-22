using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Npgsql;

namespace Airfare.Data;

public static class PostgresConfiguration
{
    public static string ConnectionString(string value)
    {
        if (!value.StartsWith("postgres://") && !value.StartsWith("postgresql://")) return value;
        var uri = new Uri(value);
        var credentials = uri.UserInfo.Split(':', 2);
        return new NpgsqlConnectionStringBuilder {
            Host = uri.Host, Port = uri.IsDefaultPort ? 5432 : uri.Port,
            Database = Uri.UnescapeDataString(uri.AbsolutePath.TrimStart('/')),
            Username = Uri.UnescapeDataString(credentials[0]),
            Password = credentials.Length > 1 ? Uri.UnescapeDataString(credentials[1]) : "",
            SslMode = SslMode.VerifyFull, Timeout = 30, CommandTimeout = 30,
            MaxPoolSize = 10, IncludeErrorDetail = false
        }.ConnectionString;
    }
}

public class AirfareContextFactory : IDesignTimeDbContextFactory<AirfareContext>
{
    public AirfareContext CreateDbContext(string[] args)
    {
        var value = Environment.GetEnvironmentVariable("MIGRATION_DATABASE_URL")
            ?? Environment.GetEnvironmentVariable("DATABASE_URL")
            ?? "Host=localhost;Database=airline_design";
        return new AirfareContext(new DbContextOptionsBuilder<AirfareContext>()
            .UseNpgsql(PostgresConfiguration.ConnectionString(value)).Options);
    }
}
