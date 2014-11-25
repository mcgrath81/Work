using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FoursquareAngularJS.Data.Entities
{
    class VenueMapper : EntityTypeConfiguration<Venue>
    {
        public VenueMapper()
        {
            this.ToTable("Venues", "foursquare");

            this.HasKey(c => c.ID);
            this.Property(c => c.ID).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            this.Property(c => c.ID).IsRequired();

            this.Property(c => c.VenueID).IsRequired();
            this.Property(c => c.VenueID).HasMaxLength(50);

            this.Property(c => c.Name).IsRequired();
            this.Property(c => c.Name).HasMaxLength(100);

            this.Property(c => c.Address).IsOptional();
            this.Property(c => c.Address).HasMaxLength(100);

            this.Property(c => c.Category).IsOptional();
            this.Property(c => c.Category).HasMaxLength(100);

            this.Property(c => c.Rating).IsOptional();
        }
    }
}
