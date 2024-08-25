using Airfare.Domain.AdminDomains;
using System.Collections.Generic;

namespace Airfare.Domain.UserRequest.TripType
{
    public class MultiCityRequest
    {
        public MultiCityRequest(List<ReservationDetails> reservationDetails)
        {
            ReservationDetails = reservationDetails;
        }

        public List<ReservationDetails> ReservationDetails { get; set; }
    }
}
