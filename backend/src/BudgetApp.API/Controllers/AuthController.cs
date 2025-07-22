using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using BudgetApp.Domain.Models;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace BudgetApp.API.Controllers;

// API controller for authentication
[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    // UserManager to handle user operations
    private readonly UserManager<AppUser> _userManager;
    private readonly IConfiguration _configuration;

    public AuthController(UserManager<AppUser> userManager, IConfiguration configuration)
    {
        _userManager = userManager;
        _configuration = configuration;
    }

    // Endpoint for user registration
    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequest request)
    {
        // Validate the request
        var existingUser = await _userManager.FindByEmailAsync(request.Email);

        // Check if the email is already in use
        if (existingUser != null)
        {
            return BadRequest("Email already in use.");
        }

        // Check if the username is already in use
        var user = new AppUser
        {
            UserName = request.Username,
            Email = request.Email,
            FullName = request.FullName
        };

        // Create the user with the provided password
        var result = await _userManager.CreateAsync(user, request.Password);
        
        // If the user creation failed, return the errors
        if (!result.Succeeded)
        {
            var errors = result.Errors.Select(e => e.Description);
            return BadRequest(new { Errors = errors });
        }
        // Generate JWT token for the newly registered user
        var token = GenerateJwtToken(user);

        return Ok(new { Token = token });
    
    }

    // Endpoint for user login
    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequest request)
    {
        
        // Find user by email
        var user = await _userManager.FindByEmailAsync(request.Email);

        // If user is not found, return unauthorized
        if (user == null)
        {
            return Unauthorized("Invalid email or password.");
        }

        // Check password
        var isPasswordValid = await _userManager.CheckPasswordAsync(user, request.Password);
        if (!isPasswordValid)
        {
        return Unauthorized("Invalid email or password.");
        }

        // Generate JWT token
        var token = GenerateJwtToken(user);

        // Return the token
        return Ok(new { Token = token });
    }

    private string GenerateJwtToken(AppUser user)
    {
        // Create claims based on user information
        var claims = new[]
        {
        new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
        new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName!),
        new Claim(JwtRegisteredClaimNames.Email, user.Email!),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        // Get the JWT key from configuration
        var jwtKey = _configuration["Jwt:Key"] ?? throw new InvalidOperationException("JWT Key is missing in configuration.");
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));

        // Create signing credentials using the key and algorithm
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        // Create the JWT token
        var token = new JwtSecurityToken(
        issuer: "budgetapp",
        audience: "budgetapp",
        claims: claims,
        expires: DateTime.UtcNow.AddHours(1),
        signingCredentials: creds);
        
        // Return the token as a string
        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}

// Request DTOs for input validation
public record RegisterRequest(string Username, string Email, string Password, string FullName);
public record LoginRequest(string Email, string Password);