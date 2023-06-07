using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Data.Sqlite;
using System;
using System.Collections.Generic;

namespace YourNamespace.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class SystemController : ControllerBase
  {
    private readonly string _connectionString;

    public SystemController(IConfiguration configuration)
    {
      _connectionString = configuration.GetConnectionString("DefaultConnection");
    }

    [HttpGet]
    public IEnumerable<SystemModel> GetDataFromDatabase()
    {
      List<SystemModel> systemModels = new List<SystemModel>();

      using (var connection = new SqliteConnection(_connectionString))
      {
        connection.Open();

        var command = connection.CreateCommand();
        command.CommandText = "SELECT * FROM system";

        using (var reader = command.ExecuteReader())
        {
          while (reader.Read())
          {
            var systemModel = new SystemModel
            {
              Id = (int)reader.GetInt64(0),
              DateOfChange = reader.GetString(1),
              StartDate = reader.IsDBNull(2) ? null : DateTime.Parse(reader.GetString(2)),
              EndDate = reader.IsDBNull(3) ? null : DateTime.Parse(reader.GetString(3)),
              Member = reader.GetString(4),
              Approved = reader.IsDBNull(5) ? null : (long?)reader.GetInt64(5),
              Comment = reader.GetString(6),
            };

            systemModels.Add(systemModel);
          }
        }
      }

      return systemModels;
    }

    [HttpPost]
    public IActionResult PostDataToDatabase(SystemModel systemModel)
    {
      // Validate the input data
      if (systemModel == null || !ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      using (var connection = new SqliteConnection(_connectionString))
      {
        connection.Open();

        // Get the current maximum Id from the table
        var getMaxIdCommand = connection.CreateCommand();
        getMaxIdCommand.CommandText = "SELECT MAX(Id) FROM system";
        var result = getMaxIdCommand.ExecuteScalar();
        var maxId = result != DBNull.Value ? Convert.ToInt32(result) : (int?)null;


        // Increment the Id value for the new record
        systemModel.Id = maxId.HasValue ? maxId.Value + 1 : 1;

        var command = connection.CreateCommand();
        command.CommandText = "INSERT INTO system (Id, DateOfChange, StartDate, EndDate, Member, Approved, Comment) " +
            "VALUES (@Id, @DateOfChange, @StartDate, @EndDate, @Member, @Approved, @Comment)";

        command.Parameters.AddWithValue("@Id", systemModel.Id);
        command.Parameters.AddWithValue("@DateOfChange", systemModel.DateOfChange);
        command.Parameters.AddWithValue("@StartDate", systemModel.StartDate);
        command.Parameters.AddWithValue("@EndDate", systemModel.EndDate);
        command.Parameters.AddWithValue("@Member", systemModel.Member);
        command.Parameters.AddWithValue("@Approved", systemModel.Approved);
        command.Parameters.AddWithValue("@Comment", systemModel.Comment);

        command.ExecuteNonQuery();
      }

      return Ok();
    }

  }
}
