
namespace Appus.Models
{
  public class VacationItem
  {
    public int Id { get; set; }
    public string DateOfChange { get; set; }
    public string StartDate { get; set; }
    public string EndDate { get; set; }
    public string Member { get; set; }
    public int Approved { get; set; }
    public int Type { get; set; }
    public string Comment { get; set; }
  }
}