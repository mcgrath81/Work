using FoursquareAngularJS.Data.Entities;
using FoursquareAngularJS.Data.Mappers;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoursquareAngularJS.Data
{
   public class FourSquareContext:DbContext
    {
       private static readonly log4net.ILog log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        public FourSquareContext() :
            base("DBConnection")
        {
            Configuration.ProxyCreationEnabled = false;
            Configuration.LazyLoadingEnabled = false;

            log.Info("Trying to get/set DB");

            Database.SetInitializer(new MigrateDatabaseToLatestVersion<FourSquareContext, FourSquareContextMigrationConfiguration>());
        }

        public DbSet<BookmarkedPlace> BookmarkedPlaces { get; set; }
       

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new BookmarkedPlaceMapper());

            log.Info("OnModelCreating");
            base.OnModelCreating(modelBuilder);
        }
    }
}
