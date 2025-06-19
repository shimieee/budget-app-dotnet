using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using BudgetApp.Domain.Models;

namespace BudgetApp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly UserManager<AppUser> _userManager;

    public UserController(UserManager<AppUser> userManager)
    {
        _userManager = userManager;
    }

    // GET: api/user
    [HttpGet]
    public IActionResult GetAllUsers()
    {
        var users = _userManager.Users.Select(u => new { u.Id, u.UserName, u.Email }).ToList();
        return Ok(users);
    }

    // GET: api/user/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetUserById(string id)
    {
        var user = await _userManager.FindByIdAsync(id);
        if (user == null) return NotFound();

        return Ok(new { user.Id, user.UserName, user.Email });
    }
}