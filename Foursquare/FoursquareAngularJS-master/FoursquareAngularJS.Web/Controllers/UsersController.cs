using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FoursquareAngularJS.Data.Entities;

namespace FoursquareAngularJS.Web.Controllers
{
    public class UsersController :BaseApiController
    {
        public bool Get(string userName)
        {
            return TheRepository.UserNameExists(userName);
        }

        public IEnumerable<User> GetAttendees()
        {

            var query = TheRepository.GetAttendees();
            var results = query.ToList();


            return results;

        }
    }
}