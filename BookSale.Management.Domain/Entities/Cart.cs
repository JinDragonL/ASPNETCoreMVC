using System.ComponentModel.DataAnnotations;

namespace BookSale.Management.Domain.Entities
{
    public class Cart: BaseEntity
    {
        [Required]
        [StringLength(20)]
        public string Code { get; set; }
        [StringLength(1000)]
        public string Note { get; set; }
        public DateTime CreatedOn { get; set; }
        public short Status { get; set; }
    }
}
