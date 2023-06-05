using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace YourNamespace.Controllers
{
  // ...

  [AllowAnonymous]
  [Route("api/[controller]")]
  [ApiController]
  public class LoginController : ControllerBase
  {
    [HttpPost]
    [Route("login")]
    public IActionResult Login(string username, string password)
    {
      // Dummy username and password
      string dummyUsername = "dummyuser";
      string dummyPassword = "dummypassword";

      if (username == dummyUsername && password == dummyPassword)
      {
        var token = GenerateJwtToken(dummyUsername);
        return Ok(new { Token = token });
      }

      return Unauthorized();
    }

    private string GenerateJwtToken(string username)
    {
      var tokenHandler = new JwtSecurityTokenHandler();
      var key = Encoding.UTF8.GetBytes("your-super-secret-key"); // Replace with your secure secret key
      var tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject = new ClaimsIdentity(new[]
          {
                    new Claim(ClaimTypes.Name, username)
                }),
        Expires = DateTime.UtcNow.AddDays(7),
        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
      };
      var token = tokenHandler.CreateToken(tokenDescriptor);
      return tokenHandler.WriteToken(token);
    }

    // ...
  }
}
