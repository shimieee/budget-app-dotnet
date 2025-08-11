using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using BudgetApp.Domain.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;


namespace BudgetApp.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    // UserManager to handle user operations
    private readonly UserManager<AppUser> _userManager;

    public UserController(UserManager<AppUser> userManager)
    {
        _userManager = userManager;
    }

    // endpoint to get all users
    [HttpGet]
    public IActionResult GetAllUsers()
    {
        // Retrieve all users from the UserManager
        var users = _userManager.Users
                .Select(u => new { u.Id, u.UserName, u.Email })
                .ToList();
        return Ok(users);
    }

    // endpoint to get a user by ID
    [HttpGet("{id}")]
    public async Task<IActionResult> GetUserById(string id)
    {
        // Check if the user exists by ID
        var user = await _userManager.FindByIdAsync(id);
        if (user == null) return NotFound();
        // Return user details
        return Ok(new { user.Id, user.UserName, user.Email });
    }

    // endpoint to get the current user's profile
    [HttpGet("me")]
    public async Task<IActionResult> GetCurrentUserProfile()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null) return Unauthorized();

        var user = await _userManager.FindByIdAsync(userId);
        if (user == null) return NotFound();

        return Ok(new
        {
            user.Id,
            user.UserName,
            user.Email,
            user.FullName,
            user.ProfilePictureUrl,
            user.Bio
            });
        }

    // endpoint to update the current user's profile
    [HttpPut("me")]
    public async Task<IActionResult> UpdateCurrentUserProfile([FromBody] AppUser updatedUser)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null) return Unauthorized();

        var user = await _userManager.FindByIdAsync(userId);
        if (user == null) return NotFound();

        // Update fields if provided
        if (!string.IsNullOrWhiteSpace(updatedUser.UserName))
                user.UserName = updatedUser.UserName;

        if (!string.IsNullOrWhiteSpace(updatedUser.Email))
                user.Email = updatedUser.Email;

        if (!string.IsNullOrWhiteSpace(updatedUser.FullName))
                user.FullName = updatedUser.FullName;

        if (!string.IsNullOrWhiteSpace(updatedUser.ProfilePictureUrl))
                user.ProfilePictureUrl = updatedUser.ProfilePictureUrl;

        if (!string.IsNullOrWhiteSpace(updatedUser.Bio))
                user.Bio = updatedUser.Bio;

        var result = await _userManager.UpdateAsync(user);
        if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

        return NoContent();
        }
    }
