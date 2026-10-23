using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.IdentityModel.Tokens;

namespace Airfare.API.Controllers;

[ApiController, Route("API/Auth")]
public class AuthController(IConfiguration config) : ControllerBase
{
    public record LoginRequest(string Email, string Password);
    [HttpPost("login"), EnableRateLimiting("login")]
    public IActionResult Login(LoginRequest request)
    {
        var expected = config["AdminPassword"];
        if (string.IsNullOrEmpty(expected) || request.Email != config["AdminEmail"] ||
            !CryptographicOperations.FixedTimeEquals(SHA256.HashData(Encoding.UTF8.GetBytes(request.Password ?? "")), SHA256.HashData(Encoding.UTF8.GetBytes(expected))))
            return Unauthorized(new { message = "Invalid email or password." });
        var token = new JwtSecurityToken("airline-demo", "airline-admin",
            new[] { new Claim(ClaimTypes.Name, request.Email), new Claim(ClaimTypes.Role, "Admin") },
            expires: DateTime.UtcNow.AddHours(1),
            signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["AdminSigningKey"]!)), SecurityAlgorithms.HmacSha256));
        return Ok(new { email = request.Email, localId = "demo-admin", idToken = new JwtSecurityTokenHandler().WriteToken(token), expiresIn = "3600" });
    }
}
