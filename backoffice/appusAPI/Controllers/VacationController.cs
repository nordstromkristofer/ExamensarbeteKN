using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace YourNamespace.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class VacationItemsController : ControllerBase
  {
    private static List<VacationItem> _vacationItems = new List<VacationItem>();

    [HttpGet]
    public ActionResult<IEnumerable<VacationItem>> GetVacationItems()
    {
      return _vacationItems;
    }

    [HttpGet("{id}")]
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
    public ActionResult<VacationItem> CreateVacationItem(VacationItem vacationItem)
    {
      _vacationItems.Add(vacationItem);
      return CreatedAtAction(nameof(GetVacationItem), new { id = vacationItem.Id }, vacationItem);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateVacationItem(int id, VacationItem updatedVacationItem)
    {
      var vacationItem = _vacationItems.Find(item => item.Id == id);

      if (vacationItem == null)
      {
        return NotFound();
      }

      // Update the properties of the existing vacation item
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
