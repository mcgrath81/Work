using System.Collections;
using FoursquareAngularJS.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoursquareAngularJS.Data
{

    public interface IFourSquareRepository
    {
        IEnumerable<EventPreview> GetEventPreviews();

        IQueryable<BookmarkedPlace> GetBookmarkedPlaces(string userName);

        bool UserNameExists(string userName);

        int SavePlace(BookmarkedPlace bookmarkedPlace);
    }

    public class FourSquareRepository : IFourSquareRepository
    {
        private static readonly log4net.ILog log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        private FourSquareContext _ctx;
        public FourSquareRepository()
        {
            try
            {
                _ctx = new FourSquareContext();
            }
            catch (Exception ex)
            {
                log.Error("FourSquareRepository", ex);
                //Log exception here
               
            }
        }

        public IQueryable<BookmarkedPlace> GetBookmarkedPlaces(string userName)
        {
            return _ctx.BookmarkedPlaces
                   .Where(b => b.UserName == userName)
                   .AsQueryable();
        }

        public IEnumerable<EventPreview> GetEventPreviews()
        {
            return _ctx.BookmarkedPlaces.GroupBy(p => new {p.VenueID, p.VenueName,p.Category,p.Rating,p.Address}).Select(g => new EventPreview()
            {
                VenueID = g.Key.VenueID,
                Name = g.Key.VenueName,
                Category = g.Key.Category,
                Rating = g.Key.Rating,
                Address = g.Key.Address,
                AttendeesCount = g.Count()
            }).ToList();
        }

        public bool UserNameExists(string userName)
        {
            try
            {
                return _ctx.BookmarkedPlaces.Any(b => b.UserName == userName);
            }
            catch (Exception ex)
            {
                log.Error("UserNameExists", ex);
                //Log exception here
                return false;
            }
        }

        public int SavePlace(BookmarkedPlace bookmarkedPlace)
        {
            try
            {
                if (_ctx.BookmarkedPlaces.Any(b => b.UserName == bookmarkedPlace.UserName
                                                && b.VenueID == bookmarkedPlace.VenueID))
                {
                    return -1;
                }

                if(!_ctx.Venues.Any(b => b.VenueID == bookmarkedPlace.VenueID))
                {
                    var newVenue = new Venue()
                    {
                        Address = bookmarkedPlace.Address,
                        Category = bookmarkedPlace.Category,
                        Name = bookmarkedPlace.VenueName,
                        VenueID = bookmarkedPlace.VenueID,
                        Rating = bookmarkedPlace.Rating
                    };
                    _ctx.Venues.Add(newVenue);
                }

                bookmarkedPlace.TS = DateTime.Now;
                _ctx.BookmarkedPlaces.Add(bookmarkedPlace);

                return _ctx.SaveChanges();

            }
            catch (Exception ex)
            {
                log.Error("SavePlace", ex);
                //Log exception here
                return 0;
            }
        }

       
    }

  
}
