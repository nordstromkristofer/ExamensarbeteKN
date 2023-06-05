using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Appus.Models;
using System.Linq;
using Microsoft.AspNetCore.Authentication.JwtBearer;


namespace YourNamespace.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class VacationItemsController : ControllerBase
  {
    private static List<VacationItem> _vacationItems = new List<VacationItem>();

    [HttpGet]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public ActionResult<IEnumerable<VacationItem>> GetVacationItems()
    {
      return _vacationItems;
    }

    [HttpGet("{id}")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public ActionResult<VacationItem> GetVacationItem(int id)
    {
      var vacationItem = _vacationItems.Find(item => item.Id == id);

      if (vacationItem == null)
      {
        return NotFound();
      }

      return vacationItem;
    }

    [HttpPost]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public ActionResult<VacationItem> CreateVacationItem(VacationItem vacationItem)
    {
      vacationItem.Id = _vacationItems.Count + 1;
      _vacationItems.Add(vacationItem);
      return CreatedAtAction(nameof(GetVacationItem), new { id = vacationItem.Id }, vacationItem);
    }

    [HttpPut("{id}")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public IActionResult UpdateVacationItem(int id, VacationItem updatedVacationItem)
    {
      var vacationItem = _vacationItems.Find(item => item.Id == id);

      if (vacationItem == null)
      {
        return NotFound();
      }

      vacationItem.DateOfChange = updatedVacationItem.DateOfChange;
      vacationItem.StartDate = updatedVacationItem.StartDate;
      vacationItem.EndDate = updatedVacationItem.EndDate;
      vacationItem.Member = updatedVacationItem.Member;
      vacationItem.Approved = updatedVacationItem.Approved;
      vacationItem.Type = updatedVacationItem.Type;
      vacationItem.Comment = updatedVacationItem.Comment;

      return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public IActionResult DeleteVacationItem(int id)
    {
      var vacationItem = _vacationItems.Find(item => item.Id == id);

      if (vacationItem == null)
      {
        return NotFound();
      }

      _vacationItems.Remove(vacationItem);

      return NoContent();
    }
  }
}
