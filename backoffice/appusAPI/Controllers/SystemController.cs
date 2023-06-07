using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Data.Sqlite;
using System.Collections.Generic;
using Microsoft.Extensions.Logging;
using System;

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
              Id = reader.GetInt32(0),
              DateOfChange = reader.IsDBNull(1) ? null : DateTime.Parse(reader.GetString(1)),
              StartDate = reader.IsDBNull(2) ? null : DateTime.Parse(reader.GetString(2)),
              EndDate = reader.IsDBNull(3) ? null : DateTime.Parse(reader.GetString(3)),
              Member = reader.GetString(4),
              Approved = reader.GetInt32(5),
              Comment = reader.GetString(6),
            };

            systemModels.Add(systemModel);
          }
        }
      }

      return systemModels;
    }
  }
}
