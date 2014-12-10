using FoursquareAngularJS.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace FoursquareAngularJS.Web.Controllers
{
    public class EventsController : BaseApiController
    {

        public IEnumerable<EventPreview> Get(DateTime date)
        {

            var query = TheRepository.GetEventPreviews(date);
            var results = query.ToList();


            return results;

        }

    }
}