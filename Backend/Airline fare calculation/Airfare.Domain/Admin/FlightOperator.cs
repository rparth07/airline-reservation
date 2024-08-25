using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Airfare.Domain.Admin
{
    public class FlightOperator
    {
        public Guid OperatorId { get; set; }

        public string CompanyName { get; set; }

        public double BaseFare { get; set; }

        public double Tax { get; set; }

        public double Convenience { get; set; }

    }
}

