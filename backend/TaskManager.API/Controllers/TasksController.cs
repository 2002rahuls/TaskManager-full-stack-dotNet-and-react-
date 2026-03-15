using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManager.API.Data;
using TaskManager.API.DTOs;
using TaskManager.API.Models;

namespace TaskManager.API.Controllers;

[ApiController]
[Route("api/[controller]")]

public class TaskController : ControllerBase
{
  private readonly AppDbContext _context;
  public TaskController(AppDbContext context)
  {
    _context = context;
  }
  //GET: api/tasks
  [HttpGet]
  public async Task<IActionResult> GetAll()
  {
    var tasks = await _context.Tasks
                .OrderByDescending(t => t.CreatedAt)
                .ToListAsync();
    return Ok(tasks);
  }
  // GET: api/tasks/{id}

  [HttpGet("{id}")]
  public async Task<IActionResult> GetById(int id)
  {
    var task = await _context.Tasks.FindAsync(id);
    if (task == null) return NotFound();
    return Ok(task);
  }
  // POST: api/tasks
  [HttpPost]
  public async Task<IActionResult> Create(CreateTaskDto dto)
  {
    var task = new TaskItem
    {
      Title = dto.Title,
      Description = dto.Description
    };
    _context.Tasks.Add(task);
    await _context.SaveChangesAsync();
    return CreatedAtAction(nameof(GetById), new { id = task.Id }, task);
  }
  // / PUT: api/tasks/{id}
  [HttpPut("{id}")]
  public async Task<IActionResult> Update(int id, UpdateTaskDto dto)
  {
    var task = await _context.Tasks.FindAsync(id);
    if (task == null) return NotFound();

    task.Title = dto.Title;
    task.Description = dto.Description;
    task.IsCompleted = dto.IsCompleted;

    await _context.SaveChangesAsync();
    return Ok(task);
  }

  // PATCH: api/tasks/{id}/toggle

  [HttpPatch("{id}/toggle")]
  public async Task<IActionResult> Toggle(int id)
  {
    var task = await _context.Tasks.FindAsync(id);
    if (task == null) return NotFound();

    task.IsCompleted = !task.IsCompleted;
    await _context.SaveChangesAsync();
    return Ok(task);

  }
  // DELETE: api/tasks/{id}
  [HttpDelete("{id}")]
  public async Task<IActionResult> Delete(int id)
  {
    var task = await _context.Tasks.FindAsync(id);
    if (task == null) return NotFound();
    _context.Tasks.Remove(task);
    await _context.SaveChangesAsync();
    return NoContent();
  }
}