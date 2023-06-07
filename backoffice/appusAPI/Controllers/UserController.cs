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
  public class UserController : ControllerBase
  {
    private readonly string _connectionString;

    public UserController(IConfiguration configuration)
    {
      _connectionString = configuration.GetConnectionString("DefaultConnection");
    }

    [HttpGet]
    public IEnumerable<UserModel> GetDataFromDatabase()
    {
      List<UserModel> usersModels = new List<UserModel>();

      using (var connection = new SqliteConnection(_connectionString))
      {
        connection.Open();

        var command = connection.CreateCommand();
        command.CommandText = "SELECT * FROM users";

        using (var reader = command.ExecuteReader())
        {
          while (reader.Read())
          {
            var usersModel = new UserModel
            {
              userName = reader.GetString(0),
              employeeId = reader.GetString(1),
            };

            usersModels.Add(usersModel);
          }
        }
      }

      return usersModels;
    }
  }
}
