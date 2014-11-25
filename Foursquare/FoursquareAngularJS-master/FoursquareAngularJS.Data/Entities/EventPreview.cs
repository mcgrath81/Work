using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoursquareAngularJS.Data.Entities
{
   public class EventPreview
    {
        public int ID { get; set; }
        public string VenueID { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Category { get; set; }
        public Decimal Rating { get; set; }
        public int AttendeesCount { get; set; }
    }
}
